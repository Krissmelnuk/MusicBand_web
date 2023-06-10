using MusicBands.Application.Commands.Contents;
using MusicBands.Domain.Entities;
using Microsoft.Extensions.Logging;
using MusicBands.Application.Services.Contents;
using MediatR;

namespace MusicBands.Application.CommandHandlers.Contents;

public class UpdateContentCommandHandler : IRequestHandler<UpdateContentCommand, Content>
{
    private readonly IContentService _contentService;
    private readonly ILogger _logger;


    public UpdateContentCommandHandler(
        IContentService contentService, 
        ILogger<UpdateContentCommandHandler> logger)
    {
        _contentService = contentService;
        _logger = logger;
    }

    public async Task<Content> Handle(UpdateContentCommand command, CancellationToken cancellationToken)
    {
        _logger.LogInformation($"Started updating content with [Id] = {command.Id}");
        
        var content = await _contentService.GetAsync(command.Id);

        content.Data = command.Data;

        await _contentService.UpdateAsync(content);
        
        _logger.LogInformation($"Finished updating content with [Id] = {command.Id}");

        return content;
    }
}