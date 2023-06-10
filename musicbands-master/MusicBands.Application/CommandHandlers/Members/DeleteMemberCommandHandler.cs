using Microsoft.Extensions.Logging;
using MusicBands.Application.Commands.Members;
using MusicBands.Application.Services.Members;
using MusicBands.Domain.Entities;
using MediatR;

namespace MusicBands.Application.CommandHandlers.Members;

public class DeleteMemberCommandHandler : IRequestHandler<DeleteMemberCommand, Member>
{
    private readonly IMembersService _membersService;
    private readonly ILogger _logger;

    public DeleteMemberCommandHandler(
        IMembersService membersService, 
        ILogger<DeleteMemberCommandHandler> logger)
    {
        _membersService = membersService;
        _logger = logger;
    }
    
    public async Task<Member> Handle(DeleteMemberCommand command, CancellationToken cancellationToken)
    {
        _logger.LogInformation($"Started deleting member with [Id] = {command.Id}");

        var member = await _membersService.GetAsync(command.Id);

        member = await _membersService.DeleteAsync(member);
        
        _logger.LogInformation($"Finished deleting member with [Id] = {command.Id}");

        return member;
    }
}