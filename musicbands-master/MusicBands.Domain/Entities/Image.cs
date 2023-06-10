using MusicBands.Domain.Enums;
using MusicBands.Domain.Interfaces;
using MusicBands.Shared.Data.Entities;

namespace MusicBands.Domain.Entities;

public class Image : BaseAuditEntity, IBandRelated
{
    public string Key { get; protected set; }
    
    public ImageType Type { get; protected set; }
    
    public Guid BandId { get; protected set; }
    
    #region navigation properties
    
    public Band Band { get; protected set; }
    
    #endregion

    /// <summary>
    /// Protected constructor for EF compatibility
    /// </summary>
    protected Image()
    {
        
    }

    public Image(
        string key,
        ImageType type,
        Band band)
    {
        Key = key;
        Type = type;
        BandId = band.Id;;
    }
}