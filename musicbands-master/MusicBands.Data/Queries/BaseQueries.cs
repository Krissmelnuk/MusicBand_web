using MusicBands.Domain.Interfaces;

namespace MusicBands.Data.Queries;

/// <summary>
/// Represents base queries
/// </summary>
public static class BaseQueries
{
    /// <summary>
    /// Filters band related entities by band identifier
    /// </summary>
    /// <param name="entities"></param>
    /// <param name="bandId"></param>
    /// <returns></returns>
    public static IQueryable<T> RelatedToBand<T>(this IQueryable<T> entities, Guid bandId) where T: IBandRelated
    {
        return entities.Where(x => x.BandId == bandId);
    }
}