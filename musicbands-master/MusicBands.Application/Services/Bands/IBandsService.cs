using MusicBands.Domain.Entities;
using MusicBands.Domain.Enums;
using MusicBands.Shared.Models;

namespace MusicBands.Application.Services.Bands;

/// <summary>
/// Provides methods for working with music bands
/// </summary>
public interface IBandsService
{
    /// <summary>
    /// Returns music band by identifier
    /// </summary>
    /// <param name="id"></param>
    /// <returns></returns>
    Task<Band> GetAsync(Guid id);
    
    /// <summary>
    /// Returns music band by url
    /// </summary>
    /// <param name="url"></param>
    /// <returns></returns>
    Task<Band> GetByUrlAsync(string url);
    
    /// <summary>
    /// Returns music band related to user
    /// </summary>
    /// <param name="userId"></param>
    /// <returns></returns>
    Task<Band[]> GetBandsRelatedToUserAsync(Guid userId);
    
    /// <summary>
    /// Filters and returns music bands
    /// </summary>
    /// <param name="status"></param>
    /// <param name="name"></param>
    /// <param name="skip"></param>
    /// <param name="take"></param>
    /// <returns></returns>
    Task<PaginationResultModel<Band>> SelectAsync(
        BandStatus? status = null,
        string? name = null,
        int? skip = null, 
        int? take = null
    );
    
    /// <summary>
    /// Filters and returns latest music bands
    /// </summary>
    /// <param name="skip"></param>
    /// <param name="take"></param>
    /// <returns></returns>
    Task<PaginationResultModel<Band>> SelectLatestAsync(
        int? skip = null, 
        int? take = null
    );
    
    /// <summary>
    /// Filters and returns latest most popular music bands
    /// </summary>
    /// <param name="skip"></param>
    /// <param name="take"></param>
    /// <returns></returns>
    Task<PaginationResultModel<Band>> SelectMostPopularAsync(
        int? skip = null, 
        int? take = null
    );
    
    /// <summary>
    /// Returns bands count
    /// </summary>
    /// <returns></returns>
    Task<int> CountAsync();

    /// <summary>
    /// Creates music band
    /// </summary>
    /// <param name="band"></param>
    /// <returns></returns>
    Task<Band> CreateAsync(Band band);

    /// <summary>
    /// Updates music band
    /// </summary>
    /// <param name="band"></param>
    /// <returns></returns>
    Task<Band> UpdateAsync(Band band);
    
    /// <summary>
    /// Deletes music band
    /// </summary>
    /// <param name="band"></param>
    /// <returns></returns>
    Task<Band> DeleteAsync(Band band);
}