using System.Net;
using MusicBands.Application.Commands.Bands;
using MusicBands.Application.Services.Bands;
using MusicBands.Domain.Entities;
using Microsoft.Extensions.Logging;
using MusicBands.Shared.Exceptions;
using MediatR;

namespace MusicBands.Application.CommandHandlers.Bands;

public class UpdateBandCommandHandler : IRequestHandler<UpdateBandCommand, Band>
{
    private readonly IBandsService _bandsService;
    private readonly ILogger _logger;

    public UpdateBandCommandHandler(
        IBandsService bandsService, 
        ILogger<UpdateBandCommandHandler> logger)
    {
        _bandsService = bandsService;
        _logger = logger;
    }

    public async Task<Band> Handle(UpdateBandCommand command, CancellationToken cancellationToken)
    {
        _logger.LogInformation($"Started updating band with [Id] = {command.Id}");
        
        var band = await _bandsService.GetAsync(command.Id);

        band.VerifyPermission(command.UserId);
            
        if (band.Url != command.Url)
        {
            await UpdateUrlAsync(band, command.Url);
        }
        
        band.Url = command.Url;
        band.Name = command.Name;
        band.Status = command.Status;

        await _bandsService.UpdateAsync(band);
        
        _logger.LogInformation($"Finished updating band with [Id] = {command.Id}");

        return band;
    }
    
    #region private

    /// <summary>
    /// Updates band url
    /// </summary>
    /// <param name="band"></param>
    /// <param name="url"></param>
    /// <exception cref="AppException"></exception>
    private async Task UpdateUrlAsync(Band band, string url)
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

        band.Url = url;
    }
    
    #endregion
}