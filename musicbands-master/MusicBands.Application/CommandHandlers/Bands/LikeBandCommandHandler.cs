using Microsoft.Extensions.Logging;
using MusicBands.Application.Commands.Bands;
using MusicBands.Application.Services.Bands;
using MediatR;

namespace MusicBands.Application.CommandHandlers.Bands;

public class LikeBandCommandHandler: IRequestHandler<LikeBandCommand, Unit>
{
    private readonly IBandsService _bandsService;
    private readonly ILogger _logger;

    public LikeBandCommandHandler(
        IBandsService bandsService, 
        ILogger<LikeBandCommandHandler> logger)
    {
        _bandsService = bandsService;
        _logger = logger;
    }

    public async Task<Unit> Handle(LikeBandCommand command, CancellationToken cancellationToken)
    {
        _logger.LogInformation($"Started liking band with [Id] = {command.Id}");

        var band = await _bandsService.GetAsync(command.Id);
        
        band.Like();

        await _bandsService.UpdateAsync(band);
        
        _logger.LogInformation($"Finished liking band with [Id] = {command.Id}");
        
        return Unit.Value;
    }
}