using MusicBands.Emails.Domain.Entities;

namespace MusicBands.Emails.Data.Queries;

/// <summary>
/// Provides queries for email templates entity
/// </summary>

public static class EmailTemplatesQueries
{
    /// <summary>
    /// Filters email templates by type
    /// </summary>
    /// <param name="emailTemplates"></param>
    /// <param name="type"></param>
    /// <returns></returns>
    public static IQueryable<EmailTemplate> ByType(this IQueryable<EmailTemplate> emailTemplates, string type)
    {
        return emailTemplates.Where(x => x.Type == type);
    }

    /// <summary>
    /// Filters email templates by locale
    /// </summary>
    /// <param name="emailTemplates"></param>
    /// <param name="locale"></param>
    /// <returns></returns>
    public static IQueryable<EmailTemplate> ByLocale(this IQueryable<EmailTemplate> emailTemplates, string locale)
    {
        return emailTemplates.Where(x => x.Locale == locale);
    }
}