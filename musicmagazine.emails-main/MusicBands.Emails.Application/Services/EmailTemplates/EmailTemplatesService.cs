using System.Net;
using Microsoft.EntityFrameworkCore;
using MusicBands.Emails.Data.Queries;
using MusicBands.Emails.Domain.Entities;
using MusicBands.Shared.Data.Repository;
using MusicBands.Shared.Exceptions;

namespace MusicBands.Emails.Application.Services.EmailTemplates;

/// <summary>
/// <see cref="IEmailTemplatesService"/>
/// </summary>
public class EmailTemplatesService : IEmailTemplatesService
{
    private readonly IGeneralRepository<EmailTemplate> _emailTemplatesRepository;

    public EmailTemplatesService(IGeneralRepository<EmailTemplate> emailTemplatesRepository)
    {
        _emailTemplatesRepository = emailTemplatesRepository;
    }

    /// <summary>
    /// <see cref="IEmailTemplatesService.GetAsync"/>
    /// </summary>
    /// <param name="type"></param>
    /// <param name="locale"></param>
    /// <returns></returns>
    public async Task<EmailTemplate> GetAsync(string type, string locale)
    {
        var emailTemplate = await _emailTemplatesRepository
            .All()
            .ByType(type)
            .ByLocale(locale)
            .FirstOrDefaultAsync();

        if (emailTemplate is null)
        {
            throw new AppException(HttpStatusCode.NotFound, "Email template does not exist");
        }

        return emailTemplate;
    }
}