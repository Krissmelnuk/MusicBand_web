using System.Net;
using Microsoft.EntityFrameworkCore;
using MusicBands.Data.Queries;
using MusicBands.Domain.Entities;
using MusicBands.Domain.Enums;
using MusicBands.Shared.Data.Queries;
using MusicBands.Shared.Data.Repository;
using MusicBands.Shared.Exceptions;

namespace MusicBands.Application.Services.Contents;

/// <summary>
/// <see cref="IContentService"/>
/// </summary>
public class ContentService : IContentService
{
    private readonly IGeneralRepository<Content> _contentRepository;

    public ContentService(IGeneralRepository<Content> contentRepository)
    {
        _contentRepository = contentRepository;
    }

    /// <summary>
    /// <see cref="IContentService.GetAsync"/>
    /// </summary>
    /// <param name="id"></param>
    /// <returns></returns>
    public async Task<Content> GetAsync(Guid id)
    {
        var content = await _contentRepository
            .All()
            .ById(id)
            .FirstOrDefaultAsync();

        if (content is null)
        {
            throw new AppException(HttpStatusCode.NotFound, "Content does not exist");
        }

        return content;
    }

    /// <summary>
    /// <see cref="IContentService.GetAllAsync"/>
    /// </summary>
    /// <param name="bandId"></param>
    /// <returns></returns>
    public async Task<Content[]> GetAllAsync(Guid bandId)
    {
        var contents = await _contentRepository
            .All()
            .RelatedToBand(bandId)
            .ToArrayAsync();

        return contents;
    }

    /// <summary>
    /// <see cref="IContentService.ExistAsync"/>
    /// </summary>
    /// <param name="bandId"></param>
    /// <param name="type"></param>
    /// <param name="locale"></param>
    /// <returns></returns>
    public async Task<bool> ExistAsync(Guid bandId, ContentType type, string locale)
    {
        return await _contentRepository
            .All()
            .ByType(type)
            .ByLocale(locale)
            .RelatedToBand(bandId)
            .AnyAsync();
    }

    /// <summary>
    /// <see cref="IContentService.SelectAsync"/>
    /// </summary>
    /// <param name="bandId"></param>
    /// <param name="locale"></param>
    /// <returns></returns>
    public async Task<Content[]> SelectAsync(Guid bandId, string locale)
    {
        var contents = await _contentRepository
            .All()
            .RelatedToBand(bandId)
            .ByLocale(locale)
            .ToArrayAsync();

        return contents;
    }

    /// <summary>
    /// <see cref="IContentService.CreateAsync"/>
    /// </summary>
    /// <param name="content"></param>
    /// <returns></returns>
    public async Task<Content> CreateAsync(Content content)
    {
        await _contentRepository.AddAsync(content);

        await _contentRepository.SaveAsync();

        return content;
    }

    /// <summary>
    /// <see cref="IContentService.UpdateAsync"/>
    /// </summary>
    /// <param name="content"></param>
    /// <returns></returns>
    public async Task<Content> UpdateAsync(Content content)
    {
        _contentRepository.Edit(content);

        await _contentRepository.SaveAsync();

        return content;
    }

    /// <summary>
    /// <see cref="IContentService.DeleteAsync"/>
    /// </summary>
    /// <param name="content"></param>
    /// <returns></returns>
    public async Task<Content> DeleteAsync(Content content)
    {
        _contentRepository.Delete(content);

        await _contentRepository.SaveAsync();

        return content;
    }
}