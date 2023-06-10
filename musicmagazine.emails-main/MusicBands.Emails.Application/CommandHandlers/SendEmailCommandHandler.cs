using Microsoft.Extensions.Logging;
using MusicBands.Emails.Application.Commands;
using MusicBands.Emails.Application.Services.Emails;
using MusicBands.Emails.Application.Services.EmailTemplates;
using MusicBands.Emails.Application.Utils.EmailFactory;
using MediatR;

namespace MusicBands.Emails.Application.CommandHandlers;

public class SendEmailCommandHandler : IRequestHandler<SendEmailCommand>
{
    private readonly IEmailTemplatesService _emailTemplatesService;
    private readonly IEmailsService _emailsService;
    private readonly IEmailFactory _emailFactory;
    private readonly ILogger _logger;
    
    public SendEmailCommandHandler(
        IEmailTemplatesService emailTemplatesService, 
        IEmailsService emailsService, 
        IEmailFactory emailFactory, 
        ILogger<SendEmailCommandHandler> logger)
    {
        _emailTemplatesService = emailTemplatesService;
        _emailsService = emailsService;
        _emailFactory = emailFactory;
        _logger = logger;
    }

    public async Task<Unit> Handle(SendEmailCommand command, CancellationToken cancellationToken)
    {
        _logger.LogInformation($"Started sending email to user with email: {command.To}");

        var emailTemplate = await _emailTemplatesService.GetAsync(
            type: command.Type,
            locale: command.Locale
        );

        var email = _emailFactory.Create(emailTemplate, command.Params);

        await _emailsService.SendAsync(
            to: command.To,
            subject: emailTemplate.Subject,
            htmlBody: email
        );
        
        _logger.LogInformation($"Finished sending email to user with email: {command.To}");
        
        return Unit.Value; 
    }
}