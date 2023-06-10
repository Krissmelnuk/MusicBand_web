using System.Net;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;
using MusicBands.Identity.Api.Models;
using MusicBands.Identity.Application.Commands;
using MusicBands.Identity.Domain.Entities;
using MusicBands.Shared.Exceptions;
using MediatR;

namespace MusicBands.Identity.Application.CommandHandlers;

public class SignUpCommandHandler : IRequestHandler<SignUpCommand, AuthModel>
{
    private readonly UserManager<User> _userManager;
    private readonly IMediator _mediator;
    private readonly ILogger _logger;

    public SignUpCommandHandler(
        UserManager<User> userManager,
        IMediator mediator,
        ILogger<SignUpCommandHandler> logger)
    {
        _userManager = userManager;
        _mediator = mediator;
        _logger = logger;
    }

    public async Task<AuthModel> Handle(SignUpCommand command, CancellationToken cancellationToken)
    {
        _logger.LogInformation($"Started sign up user with [Email] = {command.Email}");

        await VerifyUserDoesNotExist(command.Email);

        var user = new User
        {
            Email = command.Email,
            UserName = command.Email,
            FirstName = command.FirstName,
            LastName = command.LastName,
            Locale = command.Locale
        };

        await _userManager.CreateAsync(user, command.Password);

        _logger.LogInformation($"Finished sign up user with [Email] = {command.Email}");

        var signInCommand = new SignInCommand(
            email: command.Email,
            password: command.Password
        );
        
        return await _mediator.Send(signInCommand, cancellationToken);
    }

    #region private

    private async Task VerifyUserDoesNotExist(string email)
    {
        var existingUser = await _userManager.FindByEmailAsync(email);

        if (existingUser is not null)
        {
            throw new AppException(HttpStatusCode.BadRequest, "User with such email already exist.");
        }
    }

    #endregion
}