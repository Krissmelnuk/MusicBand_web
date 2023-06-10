using Microsoft.Extensions.Logging;
using MusicBands.Application.Commands.Bands;
using MusicBands.Application.Services.Bands;
using MusicBands.Domain.Entities;
using MediatR;

namespace MusicBands.Application.CommandHandlers.Bands;

public class DeleteBandCommandHandler : IRequestHandler<DeleteBandCommand, Band>
{
    private readonly IBandsService _bandsService;
    private readonly ILogger _logger;

    public DeleteBandCommandHandler(
        IBandsService bandsService, 
        ILogger<DeleteBandCommandHandler> logger)
    {
        _bandsService = bandsService;
        _logger = logger;
    }

    public async Task<Band> Handle(DeleteBandCommand command, CancellationToken cancellationToken)
    {
        _logger.LogInformation($"Started deleting band with [Id] = {command.Id}");

        var band = await _bandsService.GetAsync(command.Id);
        
        band.VerifyPermission(command.UserId, true);

        band = await _bandsService.DeleteAsync(band);
        
        _logger.LogInformation($"Finished deleting band with [Id] = {command.Id}");

        return band;
    }
}