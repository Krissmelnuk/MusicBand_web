using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;
using MusicBands.Identity.Application.Commands;
using MusicBands.Identity.Domain.Entities;
using MusicBands.Emails.Api.Constants;
using MusicBands.Emails.Api.Models;
using MusicBands.Emails.Api.WebClients;
using MediatR;

namespace MusicBands.Identity.Application.CommandHandlers;

public class ForgotPasswordCommandHandler : IRequestHandler<ForgotPasswordCommand>
{
    private readonly UserManager<User> _userManager;
    private readonly IEmailsServiceWebClient _emailsServiceWebClient;
    private readonly ILogger _logger;

    public ForgotPasswordCommandHandler(
        UserManager<User> userManager, 
        IEmailsServiceWebClient emailsServiceWebClient,
        ILogger<ForgotPasswordCommandHandler> logger)
    {
        _userManager = userManager;
        _emailsServiceWebClient = emailsServiceWebClient;
        _logger = logger;
    }

    public async Task<Unit> Handle(ForgotPasswordCommand command, CancellationToken cancellationToken)
    {
        _logger.LogInformation($"Started forgot password operation for user with [Email] = {command.Email}");
        
        var user = await _userManager.FindByEmailAsync(command.Email);

        if (user is null)
        {
            return Unit.Value;
        }

        var resetPasswordToken = await _userManager.GeneratePasswordResetTokenAsync(user);

        await _emailsServiceWebClient.SendAsync(new SendEmailModel
        {
            To = user.Email,
            Locale = user.Locale,
            Type = EmailTypes.ForgotPassword,
            Params = new []
            {
                new EmailParameterModel
                {
                    Key = "token",
                    Value = resetPasswordToken
                },
                new EmailParameterModel
                {
                    Key = "firstName",
                    Value = user.FirstName
                }
            }
        });
        
        _logger.LogInformation($"Finished forgot password operation for user with [Email] = {command.Email}");

        return Unit.Value;
    }
}