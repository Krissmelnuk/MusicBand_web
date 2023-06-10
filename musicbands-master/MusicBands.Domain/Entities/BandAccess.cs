using MusicBands.Domain.Enums;
using MusicBands.Domain.Interfaces;
using MusicBands.Shared.Data.Entities;

namespace MusicBands.Domain.Entities;

public class BandAccess : BaseAuditEntity, IBandRelated
{
    public Guid UserId { get; set; }
    
    public AccessType Type { get; set; }

    public Guid BandId { get; }

    public Band Band { get; }

    /// <summary>
    /// Protected constructor for EF compatibility
    /// </summary>
    protected BandAccess()
    {
    }
    
    public BandAccess(Guid userId, AccessType type)
    {
        UserId = userId;
        Type = type;
    }
}