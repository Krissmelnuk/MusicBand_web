using Microsoft.Extensions.Options;
using MusicBands.Emails.Application.Options;
using SendGrid.Helpers.Mail;
using SendGrid;

namespace MusicBands.Emails.Application.Services.Emails;

/// <summary>
/// <see cref="IEmailsService"/>
/// </summary>
public class EmailsService : IEmailsService
{
    private readonly SendGridOptions _options;

    public EmailsService(IOptions<SendGridOptions> options)
    {
        _options = options.Value;
    }

    /// <summary>
    /// <see cref="IEmailsService.SendAsync"/>
    /// </summary>
    /// <param name="to"></param>
    /// <param name="subject"></param>
    /// <param name="htmlBody"></param>
    /// <returns></returns>
    public async Task SendAsync(string to, string subject, string htmlBody)
    {
        await BroadcastAsync(
            to: new[] { to },
            subject: subject,
            htmlBody: htmlBody
        );
    }

    /// <summary>
    /// <see cref="IEmailsService.BroadcastAsync"/>
    /// </summary>
    /// <param name="to"></param>
    /// <param name="subject"></param>
    /// <param name="htmlBody"></param>
    /// <returns></returns>
    public async Task BroadcastAsync(string[] to, string subject, string htmlBody)
    {
        var fromEmail = new EmailAddress(
            email: _options.FromEmail,
            name: _options.FromName
        );

        var toEmails = to.Select(x => new EmailAddress(x)).ToList();
        
        var client = new SendGridClient(_options.ApiKey);
        
        var email = MailHelper.CreateSingleEmailToMultipleRecipients(
            from: fromEmail, 
            tos: toEmails,
            subject: subject,
            plainTextContent: string.Empty,
            htmlContent: htmlBody,
            showAllRecipients: false
        );
        
        if (!string.IsNullOrEmpty(_options.BccEmail))
        {
            email.AddBcc(_options.BccEmail);
        }

        await client.SendEmailAsync(email);
    }
}