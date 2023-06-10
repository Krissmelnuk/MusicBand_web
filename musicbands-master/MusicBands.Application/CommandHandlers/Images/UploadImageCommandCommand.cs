using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using MusicBands.Application.Commands.Images;
using MusicBands.Application.Services.Bands;
using MusicBands.Application.Services.Images;
using MusicBands.Domain.Entities;
using MusicBands.Shared.Data.Managers.TransactionManager;
using MusicBands.Domain.Enums;
using MediatR;

namespace MusicBands.Application.CommandHandlers.Images;

public class UploadImageCommandCommandHandler : IRequestHandler<UploadImageCommand, Image>
{
    private static readonly ImageType[] UniqueTypes =
    {
        ImageType.Profile,
        ImageType.Header
    };
    
    private readonly ITransactionManager _transactionManager;
    private readonly IImagesService _imagesService;
    private readonly IBandsService _bandsService;
    private readonly IMediator _mediator;
    private readonly ILogger _logger;

    public UploadImageCommandCommandHandler(
        ITransactionManager transactionManager, 
        IImagesService imagesService, 
        IBandsService bandsService,
        IMediator mediator,
        ILogger<UploadImageCommandCommandHandler> logger)
    {
        _transactionManager = transactionManager;
        _imagesService = imagesService;
        _bandsService = bandsService;
        _mediator = mediator;
        _logger = logger;
    }

    public async Task<Image> Handle(UploadImageCommand command, CancellationToken cancellationToken)
    {
        _logger.LogInformation($"Started uploading image for band with [Id] = {command.BandId}");

        var band = await _bandsService.GetAsync(command.BandId);
        
        band.VerifyPermission(command.UserId);

        await ReplaceImageAsync(band, command);
        
        await using var transaction = _transactionManager.BeginTransaction();
        
        try
        {
            var key = await UploadFileAsync(command.File, band);

            var image = new Image(
                key: key,
                type: command.Type,
                band: band
            );

            await _imagesService.CreateAsync(image);

            await transaction.CommitAsync(cancellationToken);
                
            _logger.LogInformation($"Finished uploading image for band with [Id] = {command.BandId}");
            
            return image;
        }
        catch (Exception e)
        {
            _logger.LogInformation($"Error during uploading image for band with [Id] = {command.BandId}", e);
            
            await transaction.RollbackAsync(cancellationToken);
            
            throw;
        }
    }
    
    #region private

    /// <summary>
    /// Replaces image
    /// </summary>
    /// <param name="band"></param>
    /// <param name="command"></param>
    private async Task ReplaceImageAsync(Band band, UploadImageCommand command)
    {
        if (UniqueTypes.Contains(command.Type))
        {
            var previousImage = band.Images.FirstOrDefault(x => x.Type == command.Type);

            if (previousImage is not null)
            {
                await _mediator.Send(new DeleteImageCommand(previousImage.Id));
            }
        }
    }
    
    /// <summary>
    /// Uploads file to blob storage ans returns unique key
    /// </summary>
    /// <param name="file"></param>
    /// <param name="band"></param>
    /// <returns></returns>
    private Task<string> UploadFileAsync(IFormFile file, Band band)
    {
        var command = new UploadFileCommand(
            file: file,
            band: band
        );

        return _mediator.Send(command);
    }
    
    #endregion
}