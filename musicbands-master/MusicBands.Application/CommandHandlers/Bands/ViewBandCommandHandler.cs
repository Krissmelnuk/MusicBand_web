using Microsoft.Extensions.Logging;
using MusicBands.Application.Commands.Bands;
using MusicBands.Application.Services.Bands;
using MediatR;

namespace MusicBands.Application.CommandHandlers.Bands;

public class ViewBandCommandHandler: IRequestHandler<ViewBandCommand, Unit>
{
    private readonly IBandsService _bandsService;
    private readonly ILogger _logger;

    public ViewBandCommandHandler(
        IBandsService bandsService, 
        ILogger<ViewBandCommandHandler> logger)
    {
        _bandsService = bandsService;
        _logger = logger;
    }
    
    public async Task<Unit> Handle(ViewBandCommand command, CancellationToken cancellationToken)
    {
        _logger.LogInformation($"Started viewing band with [Id] = {command.Id}");

        var band = await _bandsService.GetAsync(command.Id);
        
        band.View();

        await _bandsService.UpdateAsync(band);
        
        _logger.LogInformation($"Finished liking band with [Id] = {command.Id}");
        
        return Unit.Value;
    }
}