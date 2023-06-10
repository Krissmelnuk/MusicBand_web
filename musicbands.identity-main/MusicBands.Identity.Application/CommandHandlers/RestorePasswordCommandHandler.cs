using System.Net;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;
using MusicBands.Identity.Api.Models;
using MusicBands.Identity.Application.Commands;
using MusicBands.Identity.Domain.Entities;
using MusicBands.Shared.Exceptions;
using MediatR;

namespace MusicBands.Identity.Application.CommandHandlers;

public class RestorePasswordCommandHandler : IRequestHandler<RestorePasswordCommand, AuthModel>
{
    private readonly UserManager<User> _userManager;
    private readonly IMediator _mediator;
    private readonly ILogger _logger;

    public RestorePasswordCommandHandler(
        UserManager<User> userManager, 
        IMediator mediator,
        ILogger<RestorePasswordCommandHandler> logger)
    {
        _userManager = userManager;
        _mediator = mediator;
        _logger = logger;
    }
    
    public async Task<AuthModel> Handle(RestorePasswordCommand command, CancellationToken cancellationToken)
    {
        _logger.LogInformation($"Started restore password for user with [Email] = {command.Email}");

        var user = await GetUserAsync(command.Email);

        await _userManager.ResetPasswordAsync(
            user: user,
            token: command.ResetPasswordToken,
            newPassword: command.NewPassword
        );

        _logger.LogInformation($"Finished restore password for user with [Email] = {command.Email}");

        var signInCommand = new SignInCommand(
            email: command.Email,
            password: command.NewPassword
        );
        
        return await _mediator.Send(signInCommand, cancellationToken);
    }
    
    #region private

    /// <summary>
    /// Fetches and returns user
    /// </summary>
    /// <param name="email"></param>
    /// <returns></returns>
    /// <exception cref="AppException"></exception>
    private async Task<User> GetUserAsync(string email)
    {
        var user = await _userManager.FindByEmailAsync(email);

        if (user is not null)
        {
            return user;
        }
        
        _logger.LogError($"Restore password for user with [Email] = {email} failed. User dow not exist.");
            
        throw new AppException(HttpStatusCode.BadRequest, "Incorrect user name or password.");
    }
    
    #endregion
}