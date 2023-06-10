namespace MusicBands.Emails.Api.Options;

/// <summary>
/// Represents emails service options
/// </summary>
public class EmailsServiceOptions
{
    /// <summary>
    /// Contains host with email service instance
    /// </summary>
    public string Host { get; set; }
    
    /// <summary>
    /// Contains email service api key
    /// </summary>
    public string ApiKey { get; set; }
}