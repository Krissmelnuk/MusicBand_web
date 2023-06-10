namespace MusicBands.Emails.Application.Services.Emails;

/// <summary>
/// Provides methods fro sending emails
/// </summary>
public interface IEmailsService
{
    /// <summary>
    /// Sends email to
    /// </summary>
    /// <param name="to"></param>
    /// <param name="subject"></param>
    /// <param name="htmlBody"></param>
    /// <returns></returns>
    Task SendAsync(string to, string subject, string htmlBody);

    /// <summary>
    /// Broadcasts email to 
    /// </summary>
    /// <param name="to"></param>
    /// <param name="subject"></param>
    /// <param name="htmlBody"></param>
    /// <returns></returns>
    Task BroadcastAsync(string[] to, string subject, string htmlBody);
}