using System.Net;
using MusicBands.Application.Commands.Bands;
using MusicBands.Application.Services.Bands;
using MusicBands.Domain.Entities;
using Microsoft.Extensions.Logging;
using MusicBands.Shared.Exceptions;
using MediatR;

namespace MusicBands.Application.CommandHandlers.Bands;

public class CreateBandCommandHandler : IRequestHandler<CreateBandCommand, Band>
{
    private readonly IBandsService _bandsService;
    private readonly ILogger _logger;

    public CreateBandCommandHandler(
        IBandsService bandsService, 
        ILogger<CreateBandCommandHandler> logger)
    {
        _bandsService = bandsService;
        _logger = logger;
    }

    public async Task<Band> Handle(CreateBandCommand command, CancellationToken cancellationToken)
    {
        _logger.LogInformation($"Started creating band with [Name] = {command.Name}");

        await AssertUrlIsUnique(command.Url);
        
        var band = new Band(
            userId: command.UserId,
            url: command.Url,
            name: command.Name
        );

        await _bandsService.CreateAsync(band);

        _logger.LogInformation($"Finished creating band with [Name] = {command.Name}");
        
        return band;
    }
    
    #region private

    /// <summary>
    /// Asserts band url is unique
    /// </summary>
    /// <param name="url"></param>
    /// <exception cref="AppException"></exception>
    private async Task AssertUrlIsUnique(string url)
    {
        try
        {
            var existingBand = await _bandsService.GetByUrlAsync(url);

            if (existingBand is not null)
            {
                throw new AppException(HttpStatusCode.BadRequest, "Band with such URL already exists.");
            }
        }
        catch (AppException ex) when(ex.StatusCode == HttpStatusCode.NotFound)
        {
            // ignore
        }
    }
    
    #endregion
}