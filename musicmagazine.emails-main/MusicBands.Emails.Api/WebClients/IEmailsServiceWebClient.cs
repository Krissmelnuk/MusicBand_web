using MusicBands.Emails.Api.Models;

namespace MusicBands.Emails.Api.WebClients;

/// <summary>
/// Provides a wrapper above email service and give possibility to call API directly
/// </summary>
public interface IEmailsServiceWebClient
{
    /// <summary>
    /// Sends email to single receiver
    /// </summary>
    /// <param name="model"></param>
    /// <returns></returns>
    public Task SendAsync(SendEmailModel model);
    
    /// <summary>
    /// Sends email to the group of receivers
    /// </summary>
    /// <param name="model"></param>
    /// <returns></returns>
    public Task BroadcastAsync(BroadcastEmailModel model);
}