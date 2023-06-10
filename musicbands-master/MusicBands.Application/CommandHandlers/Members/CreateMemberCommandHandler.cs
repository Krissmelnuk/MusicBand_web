using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using MusicBands.Application.Commands.Images;
using MusicBands.Application.Commands.Members;
using MusicBands.Application.Services.Bands;
using MusicBands.Application.Services.Members;
using MusicBands.Domain.Entities;
using MediatR;

namespace MusicBands.Application.CommandHandlers.Members;

public class CreateMemberCommandHandler : IRequestHandler<CreateMemberCommand, Member>
{
    private readonly IBandsService _bandsService;
    private readonly IMembersService _membersService;
    private readonly IMediator _mediator;
    private readonly ILogger _logger;

    public CreateMemberCommandHandler(
        IBandsService bandsService, 
        IMembersService membersService, 
        IMediator mediator, 
        ILogger<CreateMemberCommandHandler> logger)
    {
        _bandsService = bandsService;
        _membersService = membersService;
        _mediator = mediator;
        _logger = logger;
    }

    public async Task<Member> Handle(CreateMemberCommand command, CancellationToken cancellationToken)
    {
        _logger.LogInformation($"Started creating member for band with [Id] = {command.BandId}");

        var band = await _bandsService.GetAsync(command.BandId);

        band.VerifyPermission(command.UserId);

        var avatar = await UploadFileAsync(
            file: command.Avatar,
            band: band
        );

        var member = new Member(
            band: band,
            name: command.Name,
            avatar: avatar,
            role: command.Role
        );

        await _membersService.CreateAsync(member);
        
        _logger.LogInformation($"Finished creating member for band with [Id] = {command.BandId}");
        
        return member;
    }
    
    #region private

    /// <summary>
    /// Uploads file to blob storage ans returns unique key
    /// </summary>
    /// <param name="file"></param>
    /// <param name="band"></param>
    /// <returns></returns>
    private async Task<string> UploadFileAsync(IFormFile file, Band band)
    {
        try
        {
            var command = new UploadFileCommand(
                file: file,
                band: band
            );

            return await _mediator.Send(command);
        }
        catch
        {
            return string.Empty;
        }
    }
    
    #endregion
}