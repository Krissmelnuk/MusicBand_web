using Microsoft.Extensions.Options;
using MusicBands.Emails.Api.Api;
using MusicBands.Emails.Api.Models;
using MusicBands.Emails.Api.Options;
using RestEase;

namespace MusicBands.Emails.Api.WebClients;

/// <summary>
/// <see cref="IEmailsServiceWebClient"/>
/// </summary>
public class EmailsServiceWebClient : IEmailsServiceWebClient
{
    private readonly IEmailsServiceApi _api;

    public EmailsServiceWebClient(IOptions<EmailsServiceOptions> options)
    {
        _api = RestClient.For<IEmailsServiceApi>(options.Value.Host);
        _api.ApiKey = options.Value.ApiKey;
    }
    
    /// <summary>
    /// <see cref="IEmailsServiceWebClient.SendAsync"/>
    /// </summary>
    /// <param name="model"></param>
    /// <returns></returns>
    public Task SendAsync(SendEmailModel model)
    {
        return _api.SendAsync(model);
    }

    /// <summary>
    /// <see cref="IEmailsServiceWebClient.BroadcastAsync"/>
    /// </summary>
    /// <param name="model"></param>
    public Task BroadcastAsync(BroadcastEmailModel model)
    {
        return _api.BroadcastAsync(model);
    }
}