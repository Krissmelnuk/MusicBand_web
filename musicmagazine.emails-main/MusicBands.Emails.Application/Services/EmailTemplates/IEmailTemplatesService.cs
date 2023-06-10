using MusicBands.Emails.Domain.Entities;

namespace MusicBands.Emails.Application.Services.EmailTemplates;

/// <summary>
/// Provides methods fro working with email templates
/// </summary>
public interface IEmailTemplatesService
{
    /// <summary>
    /// Returns email template by type and locale
    /// </summary>
    /// <param name="type"></param>
    /// <param name="locale"></param>
    /// <returns></returns>
    Task<EmailTemplate> GetAsync(string type, string locale);
}