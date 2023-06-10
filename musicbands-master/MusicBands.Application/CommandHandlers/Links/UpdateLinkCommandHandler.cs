using Microsoft.Extensions.Logging;
using MusicBands.Application.Commands.Links;
using MusicBands.Application.Services.Links;
using MusicBands.Domain.Entities;
using MediatR;

namespace MusicBands.Application.CommandHandlers.Links;

public class UpdateLinkCommandHandler : IRequestHandler<UpdateLinkCommand, Link>
{
    private readonly ILinksService _linksService;
    private readonly ILogger _logger;

    public UpdateLinkCommandHandler(
        ILinksService linksService, 
        ILogger<UpdateLinkCommandHandler> logger)
    {
        _linksService = linksService;
        _logger = logger;
    }

    public async Task<Link> Handle(UpdateLinkCommand command, CancellationToken cancellationToken)
    {
        _logger.LogInformation($"Started updating link with [Id] = {command.Id}");
        
        var link = await _linksService.GetAsync(command.Id);

        link.Name = command.Name;
        link.Description = command.Description;
        link.Value = command.Value;
        link.IsPublic = command.IsPublic;

        await _linksService.UpdateAsync(link);
        
        _logger.LogInformation($"Finished updating link with [Id] = {command.Id}");

        return link;
    }
}