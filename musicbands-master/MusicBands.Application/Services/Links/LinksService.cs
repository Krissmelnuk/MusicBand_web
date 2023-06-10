using System.Net;
using Microsoft.EntityFrameworkCore;
using MusicBands.Data.Queries;
using MusicBands.Domain.Entities;
using MusicBands.Shared.Data.Queries;
using MusicBands.Shared.Data.Repository;
using MusicBands.Shared.Exceptions;

namespace MusicBands.Application.Services.Links;

/// <summary>
/// <see cref="ILinksService"/>
/// </summary>
public class LinksService : ILinksService
{
    private readonly IGeneralRepository<Link> _linksRepository;

    public LinksService(IGeneralRepository<Link> linksRepository)
    {
        _linksRepository = linksRepository;
    }

    /// <summary>
    /// <see cref="ILinksService.SelectAsync"/>
    /// </summary>
    /// <param name="bandId"></param>
    /// <returns></returns>
    public async Task<Link[]> SelectAsync(Guid bandId)
    {
        var contacts = await _linksRepository
            .All()
            .RelatedToBand(bandId)
            .ToArrayAsync();

        return contacts;
    }

    /// <summary>
    /// <see cref="ILinksService.GetAsync"/>
    /// </summary>
    /// <param name="id"></param>
    /// <returns></returns>
    public async Task<Link> GetAsync(Guid id)
    {
        var contact = await _linksRepository
            .All()
            .ById(id)
            .FirstOrDefaultAsync();

        if (contact is null)
        {
            throw new AppException(HttpStatusCode.NotFound, "Link does not exist");
        }
        
        return contact;
    }

    /// <summary>
    /// <see cref="ILinksService.CreateAsync"/>
    /// </summary>
    /// <param name="link"></param>
    /// <returns></returns>
    public async Task<Link> CreateAsync(Link link)
    {
        await _linksRepository.AddAsync(link);

        await _linksRepository.SaveAsync();

        return link;
    }

    /// <summary>
    /// <see cref="ILinksService.UpdateAsync"/>
    /// </summary>
    /// <param name="link"></param>
    /// <returns></returns>
    public async Task<Link> UpdateAsync(Link link)
    {
        _linksRepository.Edit(link);

        await _linksRepository.SaveAsync();

        return link;
    }

    /// <summary>
    /// <see cref="ILinksService.DeleteAsync"/>
    /// </summary>
    /// <param name="link"></param>
    /// <returns></returns>
    public async Task<Link> DeleteAsync(Link link)
    {
        _linksRepository.Delete(link);

        await _linksRepository.SaveAsync();

        return link;
    }
}