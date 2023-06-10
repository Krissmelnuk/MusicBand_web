namespace MusicBands.Emails.Application.Options;

public class SendGridOptions
{
    public string ApiKey { get; set; }
    
    public string FromEmail { get; set; }
    
    public string FromName { get; set; }
    
    public string BccEmail { get; set; }
}