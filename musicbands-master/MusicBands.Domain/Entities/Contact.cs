using MusicBands.Domain.Enums;
using MusicBands.Domain.Interfaces;
using MusicBands.Shared.Data.Entities;

namespace MusicBands.Domain.Entities;

public class Contact : BaseAuditEntity, IBandRelated
{
    public string Name { get; set; }
    
    public string Description { get; set; }
    
    public string Value { get; set; }
    
    public bool IsPublic { get; set; }
    
    public ContactType Type { get; protected set; }
    
    public Guid BandId { get; protected set; }
    
    #region navigation properties
    
    public Band Band { get; protected set; }
    
    #endregion

    /// <summary>
    /// Protected constructor for EF compatibility
    /// </summary>
    protected Contact()
    {
        
    }
    
    public Contact(
        Band band, 
        string name, 
        string description, 
        string value,
        bool isPublic,
        ContactType type)
    {
        BandId = band.Id;
        Name = name;
        Description = description;
        Value = value;
        IsPublic = isPublic;
        Type = type;
    }
}