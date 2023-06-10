using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MusicBands.Api.Models.Content;
using MusicBands.Application.Commands.Contents;
using MusicBands.Application.Services.Contents;
using MusicBands.Shared.Utils.AuthTicket;
using AutoMapper;
using MediatR;

namespace MusicBands.Host.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ContentController : ControllerBase
{
    private readonly IContentService _contentService;
    private readonly IAuthTicket _authTicket;
    private readonly IMediator _mediator;
    private readonly IMapper _mapper;
    
    public ContentController(
        IContentService contentService, 
        IAuthTicket authTicket,
        IMediator mediator, 
        IMapper mapper)
    {
        _contentService = contentService;
        _authTicket = authTicket;
        _mediator = mediator;
        _mapper = mapper;
    }
    
    [HttpGet]
    public async Task<IActionResult> Select([FromQuery] Guid bandId, [FromQuery] string locale)
    {
        var result = await _contentService.SelectAsync(
            bandId: bandId,
            locale: locale
        );

        return Ok(_mapper.Map<ContentModel[]>(result));
    }
    
    [Authorize]
    [HttpGet("All")]
    public async Task<IActionResult> GetAll([FromQuery] Guid bandId)
    {
        var result = await _contentService.GetAllAsync(bandId);

        return Ok(_mapper.Map<ContentModel[]>(result));
    }

    [HttpPost]
    [Authorize]
    public async Task<IActionResult> Create([FromBody] CreateContentModel model)
    {
        var userId = _authTicket.GetId();
        
        var command = new CreateContentCommand(
            bandId: model.BandId,
            userId: userId,
            data: model.Data,
            locale: model.Locale,
            type: model.Type
        );

        var result = await _mediator.Send(command);

        return Ok(_mapper.Map<ContentModel>(result));
    }
    
    [HttpPut]
    [Authorize]
    public async Task<IActionResult> Update([FromBody] UpdateContentModel model)
    {
        var command = new UpdateContentCommand(
            id: model.Id,
            data: model.Data
        );

        var result = await _mediator.Send(command);

        return Ok(_mapper.Map<ContentModel>(result));
    }
    
    [Authorize]
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete([FromRoute] Guid id)
    {
        var command = new DeleteContentCommand(id);

        var result = await _mediator.Send(command);

        return Ok(_mapper.Map<ContentModel>(result));
    }
}