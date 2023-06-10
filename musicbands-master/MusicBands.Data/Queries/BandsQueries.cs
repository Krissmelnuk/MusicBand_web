using Microsoft.EntityFrameworkCore;
using MusicBands.Domain.Entities;
using MusicBands.Domain.Enums;

namespace MusicBands.Data.Queries;

/// <summary>
/// Provides queries for music bands entity
/// </summary>
public static class BandsQueries
{
    /// <summary>
    /// Filters bands by url
    /// </summary>
    /// <param name="bands"></param>
    /// <param name="url"></param>
    /// <returns></returns>
    public static IQueryable<Band> ByUrl(this IQueryable<Band> bands, string url)
    {
        return bands.Where(x => x.Url == url);
    }
    
    /// <summary>
    /// Filters bands by status
    /// </summary>
    /// <param name="bands"></param>
    /// <param name="status"></param>
    /// <returns></returns>
    public static IQueryable<Band> ByStatus(this IQueryable<Band> bands, BandStatus? status)
    {
        return bands.Where(x => status == null || x.Status == status);
    }
    
    /// <summary>
    /// Filters bands by name
    /// </summary>
    /// <param name="bands"></param>
    /// <param name="name"></param>
    /// <returns></returns>
    public static IQueryable<Band> ByName(this IQueryable<Band> bands, string? name)
    {
        return bands.Where(x => string.IsNullOrEmpty(name) || x.Name.ToUpper().Contains(name.ToUpper()));
    }
    
    /// <summary>
    /// Filters bands belong user
    /// </summary>
    /// <param name="bands"></param>
    /// <param name="userId"></param>
    /// <returns></returns>
    public static IQueryable<Band> BelongUser(this IQueryable<Band> bands, Guid userId)
    {
        return bands.Where(x => x.Accesses.Any(t => t.UserId == userId));
    }
    
    /// <summary>
    /// Includes band accesses
    /// </summary>
    /// <param name="bands"></param>
    /// <returns></returns>
    public static IQueryable<Band> IncludeAccesses(this IQueryable<Band> bands)
    {
        return bands.Include(x => x.Accesses);
    }
    
    /// <summary>
    /// Includes band images
    /// </summary>
    /// <param name="bands"></param>
    /// <returns></returns>
    public static IQueryable<Band> IncludeImages(this IQueryable<Band> bands)
    {
        return bands.Include(x => x.Images);
    }
}