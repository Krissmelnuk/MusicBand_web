using MusicBands.Emails.Domain.Entities;

namespace MusicBands.Emails.Application.Utils.EmailFactory;

/// <summary>
/// Represents email factory
/// </summary>
public interface IEmailFactory
{
    /// <summary>
    /// Creates email based on email template and params
    /// </summary>
    /// <param name="emailTemplate"></param>
    /// <param name="data"></param>
    /// <returns></returns>
    string Create(EmailTemplate emailTemplate, IDictionary<string, string> data);
}