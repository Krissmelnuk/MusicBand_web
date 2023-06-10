using MusicBands.Domain.Enums;

namespace MusicBands.Api.Models.Content;

public class ContentModel
{
    public Guid Id { get; set; }
    
    public string Data { get; set; }
    
    public string Locale { get; set; }
    
    public ContentType Type { get; set; }
}