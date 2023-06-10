using Microsoft.Extensions.Logging;
using MusicBands.Application.Commands.Contents;
using MusicBands.Application.Services.Contents;
using MusicBands.Domain.Entities;
using MediatR;

namespace MusicBands.Application.CommandHandlers.Contents;

public class DeleteContentCommandHandler : IRequestHandler< DeleteContentCommand, Content>
{
    private readonly IContentService _contentService;
    private readonly ILogger _logger;

    public DeleteContentCommandHandler(
        IContentService contentService, 
        ILogger<DeleteContentCommandHandler> logger)
    {
        _contentService = contentService;
        _logger = logger;
    }

    public async Task<Content> Handle(DeleteContentCommand command, CancellationToken cancellationToken)
    {
        _logger.LogInformation($"Started deleting content with [Id] = {command.Id}");

        var content = await _contentService.GetAsync(command.Id);

        content = await _contentService.DeleteAsync(content);
        
        _logger.LogInformation($"Finished deleting content with [Id] = {command.Id}");

        return content;
    }
}