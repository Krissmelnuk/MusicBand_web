using Microsoft.Extensions.Logging;
using MusicBands.Application.Commands.Bands;
using MusicBands.Application.Services.Bands;
using MusicBands.Domain.Entities;
using MusicBands.Domain.Enums;
using MediatR;

namespace MusicBands.Application.CommandHandlers.Bands;

public class PublishBandCommandHandler : IRequestHandler<PublishBandCommand, Band>
{
    private readonly IBandsService _bandsService;
    private readonly ILogger _logger;

    public PublishBandCommandHandler(
        IBandsService bandsService, 
        ILogger<PublishBandCommandHandler> logger)
    {
        _bandsService = bandsService;
        _logger = logger;
    }
    
    public async Task<Band> Handle(PublishBandCommand command, CancellationToken cancellationToken)
    {
        _logger.LogInformation($"Started publishing band with [Id] = {command.Id}");

        var band = await _bandsService.GetAsync(command.Id);
        
        band.VerifyPermission(command.UserId, true);

        if (band.Status == BandStatus.Published)
        {
            _logger.LogInformation($"Skipped publishing band with [Id] = {command.Id}.");
            
            return band;
        }

        band.Publish();
        
        band = await _bandsService.UpdateAsync(band);
        
        _logger.LogInformation($"Finished publishing band with [Id] = {command.Id}");

        return band;
    }
}