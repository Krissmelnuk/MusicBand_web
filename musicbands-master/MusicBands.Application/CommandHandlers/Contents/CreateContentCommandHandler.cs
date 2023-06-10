using System.Net;
using Microsoft.Extensions.Logging;
using MusicBands.Application.Commands.Contents;
using MusicBands.Application.Services.Bands;
using MusicBands.Application.Services.Contents;
using MusicBands.Domain.Entities;
using MusicBands.Shared.Exceptions;
using MediatR;

namespace MusicBands.Application.CommandHandlers.Contents;

public class CreateContentCommandHandler : IRequestHandler<CreateContentCommand, Content>
{
    private readonly IContentService _contentService;
    private readonly IBandsService _bandsService;
    private readonly ILogger _logger;

    public CreateContentCommandHandler(
        IContentService contentService, 
        IBandsService bandsService, 
        ILogger<CreateContentCommandHandler> logger)
    {
        _contentService = contentService;
        _bandsService = bandsService;
        _logger = logger;
    }

    public async Task<Content> Handle(CreateContentCommand command, CancellationToken cancellationToken)
    {
        _logger.LogInformation($"Started creating content for band with [Id] = {command.BandId}");

        await AssertCanCreate(command);
        
        var band = await _bandsService.GetAsync(command.BandId);
        
        band.VerifyPermission(command.UserId);
        
        var content = new Content(
            band: band,
            data: command.Data,
            locale: command.Locale,
            type: command.Type
        );

        await _contentService.CreateAsync(content);
        
        _logger.LogInformation($"Finished creating content for band with [Id] = {command.BandId}");

        return content;
    }
    
    #region private

    /// <summary>
    /// Asserts if content can be created
    /// </summary>
    /// <param name="command"></param>
    /// <exception cref="AppException"></exception>
    private async Task AssertCanCreate(CreateContentCommand command)
    {
        var contentExist = await _contentService.ExistAsync(
            bandId: command.BandId,
            type: command.Type,
            locale: command.Locale
        );

        if (contentExist)
        {
            throw new AppException(HttpStatusCode.BadRequest, "Content already exists.");
        }
    }
    #endregion
}