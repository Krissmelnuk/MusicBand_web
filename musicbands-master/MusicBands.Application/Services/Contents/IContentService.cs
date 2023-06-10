using MusicBands.Domain.Entities;
using MusicBands.Domain.Enums;

namespace MusicBands.Application.Services.Contents;

/// <summary>
/// Provides methods for working with content
/// </summary>
public interface IContentService
{
    /// <summary>
    /// Returns content by identifier
    /// </summary>
    /// <param name="id"></param>
    /// <returns></returns>
    Task<Content> GetAsync(Guid id);
    
    /// <summary>
    /// Returns all content by band identifier
    /// </summary>
    /// <param name="bandId"></param>
    /// <returns></returns>
    Task<Content[]> GetAllAsync(Guid bandId);
    
    /// <summary>
    /// Returns if content with corresponding configuration exists 
    /// </summary>
    /// <param name="bandId"></param>
    /// <param name="type"></param>
    /// <param name="locale"></param>
    /// <returns></returns>
    Task<bool> ExistAsync(Guid bandId, ContentType type, string locale);
    
    /// <summary>
    /// Selects and returns contents by band id and locale
    /// </summary>
    /// <param name="bandId"></param>
    /// <param name="locale"></param>
    /// <returns></returns>
    Task<Content[]> SelectAsync(Guid bandId, string locale);
    
    /// <summary>
    /// Creates and returns content
    /// </summary>
    /// <param name="content"></param>
    /// <returns></returns>
    Task<Content> CreateAsync(Content content);
    
    /// <summary>
    /// Updates and returns content
    /// </summary>
    /// <param name="content"></param>
    /// <returns></returns>
    Task<Content> UpdateAsync(Content content);
    
    /// <summary>
    /// Deletes and returns content
    /// </summary>
    /// <param name="content"></param>
    /// <returns></returns>
    Task<Content> DeleteAsync(Content content);
}