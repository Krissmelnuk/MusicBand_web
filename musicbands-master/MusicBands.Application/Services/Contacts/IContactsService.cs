using MusicBands.Domain.Entities;

namespace MusicBands.Application.Services.Contacts;

/// <summary>
/// Provides methods for working with contacts
/// </summary>
public interface IContactsService
{
    /// <summary>
    /// Returns contacts
    /// </summary>
    /// <param name="bandId"></param>
    /// <returns></returns>
    Task<Contact[]> SelectAsync(Guid bandId);
    
    /// <summary>
    /// Returns contact
    /// </summary>
    /// <param name="id"></param>
    /// <returns></returns>
    Task<Contact> GetAsync(Guid id);

    /// <summary>
    /// Creates and returns new contact
    /// </summary>
    /// <param name="contact"></param>
    /// <returns></returns>
    Task<Contact> CreateAsync(Contact contact);
    
    /// <summary>
    /// Update and returns contact
    /// </summary>
    /// <param name="contact"></param>
    /// <returns></returns>
    Task<Contact> UpdateAsync(Contact contact);
    
    /// <summary>
    /// Deletes contact
    /// </summary>
    /// <param name="contact"></param>
    /// <returns></returns>
    Task<Contact> DeleteAsync(Contact contact);
}