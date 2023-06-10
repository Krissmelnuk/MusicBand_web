using Microsoft.AspNetCore.Mvc;
using MusicBands.Api.Models.Links;
using MusicBands.Application.Commands.Links;
using MusicBands.Application.Services.Links;
using Microsoft.AspNetCore.Authorization;
using MusicBands.Shared.Utils.AuthTicket;
using MusicBands.Domain.Enums;
using AutoMapper;
using MediatR;

namespace MusicBands.Host.Controllers;

[ApiController]
[Route("api/[controller]")]
public class LinksController : ControllerBase
{
    private readonly ILinksService _linksService;
    private readonly IAuthTicket _authTicket;
    private readonly IMediator _mediator;
    private readonly IMapper _mapper;
    
    public LinksController(
        ILinksService linksService,
        IAuthTicket authTicket,
        IMediator mediator, 
        IMapper mapper)
    {
        _linksService = linksService;
        _authTicket = authTicket;
        _mediator = mediator;
        _mapper = mapper;
    }
    
    [HttpGet]
    public async Task<IActionResult> Select([FromQuery] Guid bandId)
    {
        var result = await _linksService.SelectAsync(bandId: bandId);

        return Ok(_mapper.Map<LinkModel[]>(result));
    }
    
    [HttpGet("{id}")]
    public async Task<IActionResult> Get([FromRoute] Guid id)
    {
        var result = await _linksService.GetAsync(id);

        return Ok(_mapper.Map<LinkModel>(result));
    }
    
    [HttpPost]
    [Authorize]
    public async Task<IActionResult> Create([FromBody] CreateLinkModel model)
    {
        var userId = _authTicket.GetId();
        
        var command = new CreateLinkCommand(
            bandId: model.BandId,
            userId: userId,
            name: model.Name,
            description: model.Description,
            value: model.Value,
            isPublic: model.IsPublic,
            type: (LinkType)model.Type
        );

        var result = await _mediator.Send(command);

        return Ok(_mapper.Map<LinkModel>(result));
    }
    
    [HttpPut]
    [Authorize]
    public async Task<IActionResult> Update([FromBody] UpdateLinkModel model)
    {
        var command = new UpdateLinkCommand(
            id: model.Id,
            name: model.Name,
            value: model.Value,
            description: model.Description,
            isPublic: model.IsPublic
        );

        var result = await _mediator.Send(command);

        return Ok(_mapper.Map<LinkModel>(result));
    }
    
    [Authorize]
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete([FromRoute] Guid id)
    {
        var command = new DeleteLinkCommand(id);

        var result = await _mediator.Send(command);

        return Ok(_mapper.Map<LinkModel>(result));
    }
}