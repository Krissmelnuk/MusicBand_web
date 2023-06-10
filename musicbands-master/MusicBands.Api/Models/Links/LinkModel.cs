namespace MusicBands.Api.Models.Links;

public class LinkModel
{
    public Guid Id { get; set; }
    
    public string Name { get; set; }
    
    public string Description { get; set; }
    
    public string Value { get; set; }
    
    public bool IsPublic { get; set; }
    
    public int Type { get; set; }
}