using Microsoft.Extensions.Logging;
using MusicBands.Application.Commands.Images;
using MusicBands.Application.Services.Images;
using MusicBands.Domain.Entities;
using MusicBands.Shared.Data.Managers.TransactionManager;
using MediatR;

namespace MusicBands.Application.CommandHandlers.Images;

public class DeleteImageCommandHandler : IRequestHandler<DeleteImageCommand, Image>
{
    private readonly ITransactionManager _transactionManager;
    private readonly IImagesService _imagesService;
    private readonly IMediator _mediator;
    private readonly ILogger _logger;
    
    public DeleteImageCommandHandler(
        ITransactionManager transactionManager, 
        IImagesService imagesService,
        IMediator mediator,
        ILogger<DeleteImageCommandHandler> logger)
    {
        _transactionManager = transactionManager;
        _imagesService = imagesService;
        _mediator = mediator;
        _logger = logger;
    }
    
    public async Task<Image> Handle(DeleteImageCommand command, CancellationToken cancellationToken)
    {
        _logger.LogInformation($"Started deleting image with [Id] = {command.Id}");

        var image = await _imagesService.GetAsync(command.Id);

        await using var transaction = _transactionManager.BeginTransaction();
        
        try
        {
            await _imagesService.DeleteAsync(image);

            var deleteFileCommand = new DeleteFileCommand(image.Key);

            await _mediator.Send(deleteFileCommand, cancellationToken);

            await transaction.CommitAsync(cancellationToken);

            _logger.LogInformation($"Finished deleting image with [Id] = {command.Id}");
                
            return image;
        }
        catch (Exception e)
        {
            _logger.LogInformation($"Error during deleting image with [Id] = {command.Id}", e);
            
            await transaction.RollbackAsync(cancellationToken);
            
            throw;
        }
    }
}