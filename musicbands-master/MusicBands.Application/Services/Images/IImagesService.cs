using MusicBands.Domain.Entities;

namespace MusicBands.Application.Services.Images;

/// <summary>
/// Provides service for working with images
/// </summary>
public interface IImagesService
{
    /// <summary>
    /// Returns image by identifier
    /// </summary>
    /// <param name="id"></param>
    /// <returns></returns>
    Task<Image> GetAsync(Guid id);
    
    /// <summary>
    /// Returns band images by band identifier
    /// </summary>
    /// <param name="bandId"></param>
    /// <returns></returns>
    Task<Image[]> GetByBandIdAsync(Guid bandId);
    
    /// <summary>
    /// Creates image
    /// </summary>
    /// <param name="image"></param>
    /// <returns></returns>
    Task<Image> CreateAsync(Image image);
    
    /// <summary>
    /// Deletes image
    /// </summary>
    /// <param name="image"></param>
    /// <returns></returns>
    Task<Image> DeleteAsync(Image image);
}