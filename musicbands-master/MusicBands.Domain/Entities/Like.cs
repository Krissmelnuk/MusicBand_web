using MusicBands.Domain.Interfaces;
using MusicBands.Shared.Data.Entities;

namespace MusicBands.Domain.Entities;

public class Like: BaseAuditEntity, IBandRelated
{
    public Guid BandId { get; protected set; }
    
    #region navigation properties
    
    public Band Band { get; protected set; }
    
    #endregion

    /// <summary>
    /// Protected constructor for EF compatibility
    /// </summary>
    protected Like() {}
    
    public Like(Band band)
    {
        BandId = band.Id;
    }
}