using MusicBands.Domain.Enums;
using MusicBands.Domain.Interfaces;
using MusicBands.Shared.Data.Entities;

namespace MusicBands.Domain.Entities;

public class Link : BaseAuditEntity, IBandRelated
{
    public string Name { get; set; }
    
    public string Description { get; set; }
    
    public string Value { get; set; }
    
    public bool IsPublic { get; set; }
    
    public LinkType Type { get; protected set; }
    
    public Guid BandId { get; protected set; }
    
    #region navigation properties
    
    public Band Band { get; protected set; }
    
    #endregion

    /// <summary>
    /// Protected constructor for EF compatibility
    /// </summary>
    protected Link()
    {
        
    }
    
    public Link(
        Band band, 
        string name, 
        string description, 
        string value,
        bool isPublic,
        LinkType type)
    {
        BandId = band.Id;
        Name = name;
        Description = description;
        Value = value;
        IsPublic = isPublic;
        Type = type;
    }
}