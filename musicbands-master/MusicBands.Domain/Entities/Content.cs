using MusicBands.Domain.Enums;
using MusicBands.Domain.Interfaces;
using MusicBands.Shared.Data.Entities;

namespace MusicBands.Domain.Entities;

public class Content : BaseAuditEntity, IBandRelated
{
    public string Data { get; set; }
    
    public string Locale { get; set; }
    
    public ContentType Type { get; protected set; }
    
    public Guid BandId { get; protected set; }
    
    #region navigation properties
    
    public Band Band { get; protected set; }
    
    #endregion

    /// <summary>
    /// Protected constructor for EF compatibility
    /// </summary>
    protected Content()
    {
        
    }

    public Content(
        Band band,
        string data,
        string locale,
        ContentType type)
    {
        BandId = band.Id;
        Data = data;
        Locale = locale;
        Type = type;
    }
}