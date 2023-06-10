using Microsoft.Extensions.Logging;
using MusicBands.Application.Commands.Links;
using MusicBands.Application.Services.Bands;
using MusicBands.Application.Services.Links;
using MusicBands.Domain.Entities;
using MediatR;

namespace MusicBands.Application.CommandHandlers.Links;

public class CreateLinkCommandHandler : IRequestHandler<CreateLinkCommand, Link>
{
    private readonly IBandsService _bandsService;
    private readonly ILinksService _linksService;
    private readonly ILogger _logger;

    public CreateLinkCommandHandler(
        IBandsService bandsService, 
        ILinksService linksService, 
        ILogger<CreateLinkCommandHandler> logger)
    {
        _bandsService = bandsService;
        _linksService = linksService;
        _logger = logger;
    }

    public async Task<Link> Handle(CreateLinkCommand command, CancellationToken cancellationToken)
    {
        _logger.LogInformation($"Started creating link for band with [Id] = {command.BandId}");

        var band = await _bandsService.GetAsync(command.BandId);

        band.VerifyPermission(command.UserId);
        
        var link = new Link(
            band: band,
            name: command.Name,
            description: command.Description,
            value: command.Value,
            isPublic: command.IsPublic,
            type: command.Type
        );

        await _linksService.CreateAsync(link);
        
        _logger.LogInformation($"Finished creating link for band with [Id] = {command.BandId}");

        return link;
    }
}