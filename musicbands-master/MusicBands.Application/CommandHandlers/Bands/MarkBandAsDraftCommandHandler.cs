using Microsoft.Extensions.Logging;
using MusicBands.Application.Commands.Bands;
using MusicBands.Application.Services.Bands;
using MusicBands.Domain.Entities;
using MusicBands.Domain.Enums;
using MediatR;

namespace MusicBands.Application.CommandHandlers.Bands;

public class MarkBandAsDraftCommandHandler : IRequestHandler<MarkBandAsDraftCommand, Band>
{
    private readonly IBandsService _bandsService;
    private readonly ILogger _logger;

    public MarkBandAsDraftCommandHandler(
        IBandsService bandsService, 
        ILogger<MarkBandAsDraftCommandHandler> logger)
    {
        _bandsService = bandsService;
        _logger = logger;
    }
    
    public async Task<Band> Handle(MarkBandAsDraftCommand command, CancellationToken cancellationToken)
    {
        _logger.LogInformation($"Started marking as draft band with [Id] = {command.Id}");

        var band = await _bandsService.GetAsync(command.Id);
        
        band.VerifyPermission(command.UserId, true);

        if (band.Status == BandStatus.Draft)
        {
            _logger.LogInformation($"Skipped marking as draft band with [Id] = {command.Id}.");
            
            return band;
        }

        band.MarkAsDraft();
        
        band = await _bandsService.UpdateAsync(band);
        
        _logger.LogInformation($"Finished marking as draft band with [Id] = {command.Id}");

        return band;
    }
}