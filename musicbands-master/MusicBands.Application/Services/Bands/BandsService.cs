using System.Net;
using Microsoft.EntityFrameworkCore;
using MusicBands.Data.Queries;
using MusicBands.Domain.Entities;
using MusicBands.Domain.Enums;
using MusicBands.Shared.Data.Queries;
using MusicBands.Shared.Data.Repository;
using MusicBands.Shared.Exceptions;
using MusicBands.Shared.Models;

namespace MusicBands.Application.Services.Bands;

/// <summary>
/// <see cref="IBandsService"/>
/// </summary>
public class BandsService : IBandsService
{
    private readonly IGeneralRepository<Band> _bandsRepository;

    public BandsService(IGeneralRepository<Band> bandsRepository)
    {
        _bandsRepository = bandsRepository;
    }

    /// <summary>
    /// <see cref="IBandsService.GetAsync"/>
    /// </summary>
    /// <param name="id"></param>
    /// <returns></returns>
    /// <exception cref="AppException"></exception>
    public async Task<Band> GetAsync(Guid id)
    {
        var band = await _bandsRepository
            .All()
            .ById(id)
            .IncludeImages()
            .IncludeAccesses()
            .FirstOrDefaultAsync();

        if (band is null)
        {
            throw new AppException(HttpStatusCode.NotFound, "Band does not exist");
        }

        return band;
    }

    /// <summary>
    /// <see cref="IBandsService.GetByUrlAsync"/>
    /// </summary>
    /// <param name="url"></param>
    /// <returns></returns>
    public async Task<Band> GetByUrlAsync(string url)
    {
        var band = await _bandsRepository
            .All()
            .ByUrl(url)
            .IncludeImages()
            .FirstOrDefaultAsync();

        if (band is null)
        {
            throw new AppException(HttpStatusCode.NotFound, "Band does not exist");
        }

        return band;
    }

    /// <summary>
    /// <see cref="IBandsService.GetBandsRelatedToUserAsync"/>
    /// </summary>
    /// <param name="userId"></param>
    /// <returns></returns>
    public async Task<Band[]> GetBandsRelatedToUserAsync(Guid userId)
    {
        var bands = await _bandsRepository
            .All()
            .IncludeImages()
            .IncludeAccesses()
            .BelongUser(userId)
            .ToArrayAsync();

        return bands;
    }

    /// <summary>
    /// <see cref="IBandsService.SelectAsync"/>
    /// </summary>
    /// <param name="name"></param>
    /// <param name="status"></param>
    /// <param name="skip"></param>
    /// <param name="take"></param>
    /// <returns></returns>
    public async Task<PaginationResultModel<Band>> SelectAsync(
        BandStatus? status = BandStatus.Published,
        string? name = null,
        int? skip = null, 
        int? take = null)
    {
        var query = _bandsRepository
            .All()
            .IncludeImages()
            .ByStatus(status)
            .ByName(name);

        var totalCount = await query.CountAsync();
        var data = await query.PageAsync(skip: skip, take: take);

        return new PaginationResultModel<Band>(
            totalCount: totalCount,
            data: data
        );
    }

    /// <summary>
    /// <see cref="IBandsService.SelectLatestAsync"/>
    /// </summary>
    /// <param name="skip"></param>
    /// <param name="take"></param>
    /// <returns></returns>
    public async Task<PaginationResultModel<Band>> SelectLatestAsync(int? skip = null, int? take = null)
    {
        var query = _bandsRepository
            .All()
            .ByStatus(BandStatus.Published)
            .IncludeImages()
            .OrderByDescending(x => x.CreatedAt);

        var totalCount = await query.CountAsync();
        var data = await query.PageAsync(skip: skip, take: take);

        return new PaginationResultModel<Band>(
            totalCount: totalCount,
            data: data
        );
    }

    /// <summary>
    /// <see cref="IBandsService.SelectMostPopularAsync"/>
    /// </summary>
    /// <param name="skip"></param>
    /// <param name="take"></param>
    /// <returns></returns>
    public async Task<PaginationResultModel<Band>> SelectMostPopularAsync(int? skip = null, int? take = null)
    {
        var query = _bandsRepository
            .All()
            .ByStatus(BandStatus.Published)
            .IncludeImages()
            .OrderByDescending(x => x.Rating.Likes);

        var totalCount = await query.CountAsync();
        var data = await query.PageAsync(skip: skip, take: take);

        return new PaginationResultModel<Band>(
            totalCount: totalCount,
            data: data
        );
    }

    /// <summary>
    /// <see cref="IBandsService.CountAsync"/>
    /// </summary>
    /// <returns></returns>
    public async Task<int> CountAsync()
    {
        var count = await _bandsRepository
            .All()
            .ByStatus(BandStatus.Published)
            .CountAsync();

        return count;
    }

    /// <summary>
    /// <see cref="IBandsService.CreateAsync"/>
    /// </summary>
    /// <param name="band"></param>
    /// <returns></returns>
    public async Task<Band> CreateAsync(Band band)
    {
        await _bandsRepository.AddAsync(band);
        
        await _bandsRepository.SaveAsync();

        return band;
    }

    /// <summary>
    /// <see cref="IBandsService.UpdateAsync"/>
    /// </summary>
    /// <param name="band"></param>
    /// <returns></returns>
    public async Task<Band> UpdateAsync(Band band)
    {
        _bandsRepository.Edit(band);
        
        await _bandsRepository.SaveAsync();

        return band;
    }

    /// <summary>
    /// <see cref="IBandsService.DeleteAsync"/>
    /// </summary>
    /// <param name="band"></param>
    /// <returns></returns>
    public async Task<Band> DeleteAsync(Band band)
    {
        _bandsRepository.Delete(band);

        await _bandsRepository.SaveAsync();

        return band;
    }
}