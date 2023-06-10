using Microsoft.AspNetCore.Mvc;
using MusicBands.Application.Services.Contacts;
using MusicBands.Api.Models.Contacts;
using MusicBands.Application.Commands.Contacts;
using MusicBands.Shared.Utils.AuthTicket;
using Microsoft.AspNetCore.Authorization;
using MusicBands.Domain.Enums;
using AutoMapper;
using MediatR;

namespace MusicBands.Host.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ContactsController : ControllerBase
{
    private readonly IContactsService _contactsService;
    private readonly IAuthTicket _authTicket;
    private readonly IMediator _mediator;
    private readonly IMapper _mapper;
    
    public ContactsController(
        IContactsService contactsService, 
        IAuthTicket authTicket,
        IMediator mediator, 
        IMapper mapper)
    {
        _contactsService = contactsService;
        _authTicket = authTicket;
        _mediator = mediator;
        _mapper = mapper;
    }
    
    [HttpGet]
    public async Task<IActionResult> Select([FromQuery] Guid bandId)
    {
        var result = await _contactsService.SelectAsync(bandId: bandId);

        return Ok(_mapper.Map<ContactModel[]>(result));
    }
    
    [HttpGet("{id}")]
    public async Task<IActionResult> Get([FromRoute] Guid id)
    {
        var result = await _contactsService.GetAsync(id);

        return Ok(_mapper.Map<ContactModel>(result));
    }
    
    [HttpPost]
    [Authorize]
    public async Task<IActionResult> Create([FromBody] CreateContactModel model)
    {
        var userId = _authTicket.GetId();
        
        var command = new CreateContactCommand(
            bandId: model.BandId,
            userId: userId,
            name: model.Name,
            description: model.Description,
            value: model.Value,
            isPublic: model.IsPublic,
            type: (ContactType)model.Type
        );

        var result = await _mediator.Send(command);

        return Ok(_mapper.Map<ContactModel>(result));
    }
    
    [HttpPut]
    [Authorize]
    public async Task<IActionResult> Update([FromBody] UpdateContactModel model)
    {
        var command = new UpdateContactCommand(
            id: model.Id,
            name: model.Name,
            value: model.Value,
            description: model.Description,
            isPublic: model.IsPublic
        );

        var result = await _mediator.Send(command);

        return Ok(_mapper.Map<ContactModel>(result));
    }
    
    [Authorize]
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete([FromRoute] Guid id)
    {
        var command = new DeleteContactCommand(id);

        var result = await _mediator.Send(command);

        return Ok(_mapper.Map<ContactModel>(result));
    }
}