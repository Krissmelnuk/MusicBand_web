using MusicBands.Emails.Api.Models;
using RestEase;

namespace MusicBands.Emails.Api.Api;

/// <summary>
/// Represents email service api
/// </summary>
public interface IEmailsServiceApi: IDisposable
{
    /// <summary>
    /// Contains api key header
    /// </summary>
    [Header("ApiKey")]
    string ApiKey { get; set; }
    
    /// <summary>
    /// Sends email
    /// </summary>
    /// <param name="model"></param>
    /// <returns></returns>
    [Post("api/Emails/Send")]
    Task SendAsync([Body] SendEmailModel model);
    
    /// <summary>
    /// Broadcasts email
    /// </summary>
    /// <param name="model"></param>
    /// <returns></returns>
    [Post("api/Emails/Broadcast")]
    Task BroadcastAsync([Body] BroadcastEmailModel model);
}