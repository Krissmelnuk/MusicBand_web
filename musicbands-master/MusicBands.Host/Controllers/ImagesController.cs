using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MusicBands.Api.Models.Images;
using MusicBands.Application.Commands.Images;
using MusicBands.Shared.Utils.AuthTicket;
using MusicBands.Domain.Enums;
using MusicBands.Application.Services.Images;
using AutoMapper;
using MediatR;

namespace MusicBands.Host.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ImagesController : ControllerBase
{
    private readonly IImagesService _imagesService;
    private readonly IAuthTicket _authTicket;
    private readonly IMediator _mediator;
    private readonly IMapper _mapper;

    public ImagesController(
        IImagesService imagesService,
        IAuthTicket authTicket, 
        IMediator mediator, 
        IMapper mapper)
    {
        _imagesService = imagesService;
        _authTicket = authTicket;
        _mediator = mediator;
        _mapper = mapper;
    }
    
    [HttpGet("{key}")]
    public async Task<IActionResult> Download([FromRoute] string key)
    {
        var command = new DownloadImageCommand(Uri.UnescapeDataString(key));

        var response = await _mediator.Send(command);

        return File(response.ResponseStream, response.Headers.ContentType);
    }
    
    [HttpGet]
    public async Task<IActionResult> GetBandsImages([FromQuery] Guid bandId)
    {
        var images = await _imagesService.GetByBandIdAsync(bandId);

        return Ok(_mapper.Map<ImageModel[]>(images));
    }
    
    [HttpPost]
    [Authorize]
    public async Task<IActionResult> Upload(IFormFile file, ImageType type, Guid bandId)
    {
        var userId = _authTicket.GetId();
        
        var command = new UploadImageCommand(
            bandId: bandId,
            userId: userId,
            type: type,
            file: file
        );

        var result = await _mediator.Send(command);

        return Ok(_mapper.Map<ImageModel>(result));
    }
    
    [Authorize]
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete([FromRoute] Guid id)
    {
        var command = new DeleteImageCommand(id);

        var result = await _mediator.Send(command);

        return Ok(_mapper.Map<ImageModel>(result));
    }
}