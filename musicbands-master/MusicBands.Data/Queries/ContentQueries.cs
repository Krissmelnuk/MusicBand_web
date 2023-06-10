using MusicBands.Domain.Entities;
using MusicBands.Domain.Enums;

namespace MusicBands.Data.Queries;

/// <summary>
/// Provides queries for content
/// </summary>
public static class ContentQueries
{
    /// <summary>
    /// Filters contents by locale
    /// </summary>
    /// <param name="contents"></param>
    /// <param name="locale"></param>
    /// <returns></returns>
    public static IQueryable<Content> ByLocale(this IQueryable<Content> contents, string locale)
    {
        return contents.Where(x => x.Locale.ToUpper() == locale.ToUpper());
    }
    
    /// <summary>
    /// Filters contents by type
    /// </summary>
    /// <param name="contents"></param>
    /// <param name="type"></param>
    /// <returns></returns>
    public static IQueryable<Content> ByType(this IQueryable<Content> contents, ContentType type)
    {
        return contents.Where(x => x.Type == type);
    }
}