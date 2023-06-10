using MediatR;
using MusicBands.Application.Commands.Members;
using MusicBands.Domain.Entities;

namespace MusicBands.Application.CommandHandlers.Members;

public class UpdateMemberCommandHandler : IRequestHandler<UpdateMemberCommand, Member>
{
    public Task<Member> Handle(UpdateMemberCommand command, CancellationToken cancellationToken)
    {
        throw new NotImplementedException();
    }
}