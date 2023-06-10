using MusicBands.Domain.Entities;

namespace MusicBands.Application.Services.Links;

/// <summary>
/// Provides methods for working with links
/// </summary>
public interface ILinksService
{
    /// <summary>
    /// Returns links
    /// </summary>
    /// <param name="bandId"></param>
    /// <returns></returns>
    Task<Link[]> SelectAsync(Guid bandId);
    
    /// <summary>
    /// Returns link
    /// </summary>
    /// <param name="id"></param>
    /// <returns></returns>
    Task<Link> GetAsync(Guid id);

    /// <summary>
    /// Creates and returns new link
    /// </summary>
    /// <param name="link"></param>
    /// <returns></returns>
    Task<Link> CreateAsync(Link link);
    
    /// <summary>
    /// Update and returns link
    /// </summary>
    /// <param name="link"></param>
    /// <returns></returns>
    Task<Link> UpdateAsync(Link link);
    
    /// <summary>
    /// Deletes link
    /// </summary>
    /// <param name="link"></param>
    /// <returns></returns>
    Task<Link> DeleteAsync(Link link);
}