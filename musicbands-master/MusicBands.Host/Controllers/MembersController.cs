using Microsoft.AspNetCore.Mvc;
using MusicBands.Api.Models.Members;
using MusicBands.Application.Commands.Members;
using MusicBands.Application.Services.Members;
using MusicBands.Shared.Utils.AuthTicket;
using AutoMapper;
using MediatR;

namespace MusicBands.Host.Controllers;

[ApiController]
[Route("api/[controller]")]
public class MembersController : ControllerBase
{
    private readonly IMembersService _membersService;
    private readonly IAuthTicket _authTicket;
    private readonly IMediator _mediator;
    private readonly IMapper _mapper;
    
    public MembersController(
        IMembersService membersService, 
        IAuthTicket authTicket,
        IMediator mediator,
        IMapper mapper)
    {
        _membersService = membersService;
        _authTicket = authTicket;
        _mediator = mediator;
        _mapper = mapper;
    }
    
    [HttpGet]
    public async Task<IActionResult> Select([FromQuery] Guid bandId)
    {
        var result = await _membersService.SelectAsync(bandId: bandId);

        return Ok(_mapper.Map<MemberModel[]>(result));
    }
    
    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateMemberModel model)
    {
        var userId = _authTicket.GetId();

        var details = model.Details.ToDictionary(x => x.Locale, x => x.Bio);
        
        var command = new CreateMemberCommand(
            bandId: model.BandId,
            userId: userId,
            name: model.Name,
            avatar: model.Avatar,
            role: model.Role,
            details: details
        );

        var result = await _mediator.Send(command);
        
        return Ok(_mapper.Map<MemberModel>(result));
    }
    
    [HttpPut]
    public async Task<IActionResult> Update([FromBody] UpdateMemberModel model)
    {
        var details = model.Details.ToDictionary(x => x.Locale, x => x.Bio);
        
        var command = new UpdateMemberCommand(
            id: model.Id,
            name: model.Name,
            avatar: model.Avatar,
            role: model.Role,
            details: details
        );

        var result = await _mediator.Send(command);
        
        return Ok(_mapper.Map<MemberModel>(result));
    }
    
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete([FromQuery] Guid id)
    {
        var command = new DeleteMemberCommand(id);

        var result = await _mediator.Send(command);

        return Ok(_mapper.Map<MemberModel>(result));
    }
}