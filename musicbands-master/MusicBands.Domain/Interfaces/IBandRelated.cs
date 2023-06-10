using MusicBands.Domain.Entities;

namespace MusicBands.Domain.Interfaces;

/// <summary>
/// Represents band related entity
/// </summary>
public interface IBandRelated
{
    /// <summary>
    /// Contains band identifier
    /// </summary>
    public Guid BandId { get; }
    
    /// <summary>
    /// Contains band
    /// </summary>
    public Band Band { get; }
}