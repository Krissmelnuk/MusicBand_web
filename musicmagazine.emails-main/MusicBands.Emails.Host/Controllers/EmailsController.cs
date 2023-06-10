using MediatR;
using Microsoft.AspNetCore.Mvc;
using MusicBands.Emails.Api.Models;
using MusicBands.Emails.Application.Commands;
using MusicBands.Shared.Authorization;

namespace MusicBands.Emails.Host.Controllers;

[ApiController]
[Route("api/[controller]")]

public class EmailsController : ControllerBase
{
    private readonly IMediator _mediator;

    public EmailsController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [ApiAuthorization]
    [HttpPost("Send")]
    public async Task<IActionResult> SendAsync([FromBody] SendEmailModel model)
    {
        var command = new SendEmailCommand(
            to: model.To,
            type: model.Type,
            locale: model.Locale,
            @params: model.Params.ToDictionary(x => x.Key, x => x.Value)
        );

        await _mediator.Send(command);
        
        return Ok();
    }
    
    [ApiAuthorization]
    [HttpPost("Broadcast")]
    public async Task<IActionResult> BroadcastAsync([FromBody] BroadcastEmailModel model)
    {
        return Ok();
    }
}