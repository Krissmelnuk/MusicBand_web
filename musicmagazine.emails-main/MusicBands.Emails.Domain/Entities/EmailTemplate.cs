using MusicBands.Shared.Data.Entities;

namespace MusicBands.Emails.Domain.Entities;

public class EmailTemplate : BaseAuditEntity
{
    public string Type { get; protected set; }
    
    public string Locale { get; protected set; }
    
    public string Subject { get; protected set; }
    
    public string Body { get; protected set; }
}