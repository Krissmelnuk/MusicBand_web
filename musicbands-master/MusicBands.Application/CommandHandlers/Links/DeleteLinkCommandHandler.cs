using Microsoft.Extensions.Logging;
using MusicBands.Application.Commands.Links;
using MusicBands.Application.Services.Links;
using MusicBands.Domain.Entities;
using MediatR;

namespace MusicBands.Application.CommandHandlers.Links;

public class DeleteLinkCommandHandler : IRequestHandler<DeleteLinkCommand, Link>
{
    private readonly ILinksService _linksService;
    private readonly ILogger _logger;

    public DeleteLinkCommandHandler(
        ILinksService linksService, 
        ILogger<DeleteLinkCommandHandler> logger)
    {
        _linksService = linksService;
        _logger = logger;
    }

    public async Task<Link> Handle(DeleteLinkCommand command, CancellationToken cancellationToken)
    {
        _logger.LogInformation($"Started deleting link with [Id] = {command.Id}");

        var link = await _linksService.GetAsync(command.Id);

        link = await _linksService.DeleteAsync(link);
        
        _logger.LogInformation($"Finished deleting link with [Id] = {command.Id}");

        return link;
    }
}