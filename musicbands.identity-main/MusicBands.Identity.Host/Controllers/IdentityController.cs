using Microsoft.AspNetCore.Mvc;
using MusicBands.Identity.Api.Models;
using MusicBands.Identity.Application.Commands;
using Microsoft.AspNetCore.Authorization;
using MusicBands.Shared.Utils.AuthTicket;
using MediatR;

namespace MusicBands.Identity.Host.Controllers;

[ApiController]
[Route("api/[controller]")]
public class IdentityController : ControllerBase
{
    private readonly IAuthTicket _authTicket;
    private readonly IMediator _mediator;
    
    public IdentityController(
        IAuthTicket authTicket,
        IMediator mediator)
    {
        _authTicket = authTicket;
        _mediator = mediator;
    }
    
    [HttpPut]
    [Authorize]
    public async Task<IActionResult> Update([FromBody] UpdateIdentityModel model)
    {
        var command = new UpdateIdentityCommand(
            id: _authTicket.GetId(),
            firstName: model.FirstName,
            lastName: model.LastName,
            locale: model.Locale
        );

        var result = await _mediator.Send(command);

        return Ok(result);
    }
    
    
    [Authorize]
    [HttpPatch("Locale")]
    public async Task<IActionResult> UpdateLocale([FromQuery] string locale)
    {
        var command = new UpdateLocaleCommand(
            id: _authTicket.GetId(),
            locale: locale
        );

        var result = await _mediator.Send(command);

        return Ok(result);
    }

    [HttpPost("SignUp")]
    public async Task<IActionResult> SignUp([FromBody] SignUpModel model)
    {
        var command = new SignUpCommand(
            email: model.Email,
            password: model.Password,
            firstName: model.FirstName,
            lastName: model.LastName,
            locale: model.Locale
        );

        var result = await _mediator.Send(command);

        return Ok(result);
    }

    [HttpPost("SignIn")]
    public async Task<IActionResult> SignIn([FromBody] SignInModel model)
    {
        var command = new SignInCommand(
            email: model.Email,
            password: model.Password
        );

        var result = await _mediator.Send(command);

        return Ok(result);
    }
    
    [HttpPost("Password/Forgot")]
    public async Task<IActionResult> ForgotPassword([FromBody] ForgotPasswordModel model)
    {
        var command = new ForgotPasswordCommand(
            email: model.Email
        );

        await _mediator.Send(command);

        return Ok();
    }
    
    [HttpPost("Password/Restore")]
    public async Task<IActionResult> RestorePassword([FromBody] RestorePasswordModel model)
    {
        var command = new RestorePasswordCommand(
            email: model.Email,
            newPassword: model.NewPassword,
            resetPasswordToken: model.ResetPasswordToken
        );

        var result = await _mediator.Send(command);

        return Ok(result);
    }
    
    [Authorize]
    [HttpPost("Password/Change")]
    public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordModel model)
    {
        var userId = _authTicket.GetId();
        
        var command = new ChangePasswordCommand(
            userId: userId,
            newPassword: model.NewPassword,
            oldPassword: model.OldPassword
        );

        await _mediator.Send(command);

        return Ok();
    }
}