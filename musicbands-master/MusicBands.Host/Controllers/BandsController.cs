using Microsoft.AspNetCore.Mvc;
using MusicBands.Api.Models.Bands;
using MusicBands.Application.Commands.Bands;
using MusicBands.Application.Services.Bands;
using MusicBands.Domain.Enums;
using MusicBands.Shared.Models;
using Microsoft.AspNetCore.Authorization;
using MusicBands.Shared.Utils.AuthTicket;
using AutoMapper;
using MediatR;

namespace MusicBands.Host.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BandsController : ControllerBase
{
    private readonly IBandsService _bandsService;
    private readonly IAuthTicket _authTicket;
    private readonly IMediator _mediator;
    private readonly IMapper _mapper;
    
    public BandsController(
        IBandsService bandsService, 
        IAuthTicket authTicket,
        IMediator mediator,
        IMapper mapper)
    {
        _bandsService = bandsService;
        _authTicket = authTicket;
        _mediator = mediator;
        _mapper = mapper;
    }
    
    [HttpGet]
    public async Task<IActionResult> Get(
        [FromQuery] BandStatus? status = null,
        [FromQuery] string? name = null,
        [FromQuery] int? skip = null,
        [FromQuery] int? take = null)
    {
        var result = await _bandsService.SelectAsync(
            status: status,
            skip: skip,
            take: take,
            name: name
        );

        return Ok(new PaginationResultModel<BandModel>(
            totalCount: result.TotalCount,
            data: _mapper.Map<BandModel[]>(result.Data))
        );
    }
    
    [HttpGet("Latest")]
    public async Task<IActionResult> GetLatest(
        [FromQuery] int? skip = null,
        [FromQuery] int? take = null)
    {
        var result = await _bandsService.SelectLatestAsync(
            skip: skip,
            take: take
        );

        return Ok(new PaginationResultModel<BandModel>(
            totalCount: result.TotalCount,
            data: _mapper.Map<BandModel[]>(result.Data))
        );
    }
    
    [HttpGet("Popular")]
    public async Task<IActionResult> GetMostPopular(
        [FromQuery] int? skip = null,
        [FromQuery] int? take = null)
    {
        var result = await _bandsService.SelectMostPopularAsync(
            skip: skip,
            take: take
        );

        return Ok(new PaginationResultModel<BandModel>(
            totalCount: result.TotalCount,
            data: _mapper.Map<BandModel[]>(result.Data))
        );
    }
    
    [Authorize]
    [HttpGet("My")]
    public async Task<IActionResult> GetMyBands()
    {
        var userId = _authTicket.GetId();
        
        var result = await _bandsService.GetBandsRelatedToUserAsync(userId);

        return Ok(_mapper.Map<BandModel[]>(result));
    }
    
    [HttpGet("Count")]
    public async Task<IActionResult> GetCount()
    {
        var result = await _bandsService.CountAsync();

        return Ok(result);
    }
    
    [Authorize]
    [HttpGet("{id}")]
    public async Task<IActionResult> Get([FromRoute] Guid id)
    {
        var result = await _bandsService.GetAsync(id);

        await _mediator.Send(new ViewBandCommand(id));

        return Ok(_mapper.Map<BandModel>(result));
    }
    
    [HttpGet("Url/{url}")]
    public async Task<IActionResult> GetByUrl([FromRoute] string url)
    {
        var result = await _bandsService.GetByUrlAsync(url);

        return Ok(_mapper.Map<BandModel>(result));
    }
    
    [HttpPost]
    [Authorize]
    public async Task<IActionResult> Create([FromBody] CreateBandModel model)
    {
        var userId = _authTicket.GetId();
        
        var command = new CreateBandCommand(
            userId: userId,
            url: model.Url,
            name: model.Name
        );

        var result = await _mediator.Send(command);

        return Ok(_mapper.Map<BandModel>(result));
    }
    
    [HttpPost("{id}/Like")]
    public async Task<IActionResult> Like([FromRoute] Guid id)
    {
        var command = new LikeBandCommand(id);

        await _mediator.Send(command);

        return Ok();
    }
    
    [HttpPut]
    [Authorize]
    public async Task<IActionResult> Update([FromBody] UpdateBandModel model)
    {
        var userId = _authTicket.GetId();
        
        var command = new UpdateBandCommand(
            id: model.Id,
            userId: userId,
            url: model.Url,
            name: model.Name,
            status: (BandStatus) model.Status
        );

        var result = await _mediator.Send(command);

        return Ok(_mapper.Map<BandModel>(result));
    }
    
    [Authorize]
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete([FromRoute] Guid id)
    {
        var userId = _authTicket.GetId();
        
        var command = new DeleteBandCommand(
            id: id,
            userId: userId
        );

        var result = await _mediator.Send(command);

        return Ok(_mapper.Map<BandModel>(result));
    }
    
    [Authorize]
    [HttpPatch("{id}/Publish")]
    public async Task<IActionResult> Publish([FromRoute] Guid id)
    {
        var userId = _authTicket.GetId();
        
        var command = new PublishBandCommand(
            id: id,
            userId: userId
        );

        var result = await _mediator.Send(command);

        return Ok(_mapper.Map<BandModel>(result));
    }
    
    [Authorize]
    [HttpPatch("{id}/Draft")]
    public async Task<IActionResult> MarkAsDraft([FromRoute] Guid id)
    {
        var userId = _authTicket.GetId();
        
        var command = new MarkBandAsDraftCommand(
            id: id,
            userId: userId
        );

        var result = await _mediator.Send(command);

        return Ok(_mapper.Map<BandModel>(result));
    }
}