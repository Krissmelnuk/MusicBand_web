using System.Net;
using Microsoft.EntityFrameworkCore;
using MusicBands.Data.Queries;
using MusicBands.Domain.Entities;
using MusicBands.Shared.Data.Queries;
using MusicBands.Shared.Data.Repository;
using MusicBands.Shared.Exceptions;

namespace MusicBands.Application.Services.Contacts;

/// <summary>
/// <see cref="IContactsService"/>
/// </summary>
public class ContactsService : IContactsService
{
    private readonly IGeneralRepository<Contact> _contactsRepository;

    public ContactsService(IGeneralRepository<Contact> contactsRepository)
    {
        _contactsRepository = contactsRepository;
    }

    /// <summary>
    /// <see cref="IContactsService.SelectAsync"/>
    /// </summary>
    /// <param name="bandId"></param>
    /// <returns></returns>
    public async Task<Contact[]> SelectAsync(Guid bandId)
    {
        var contacts = await _contactsRepository
            .All()
            .RelatedToBand(bandId)
            .ToArrayAsync();

        return contacts;
    }

    /// <summary>
    /// <see cref="IContactsService.GetAsync"/>
    /// </summary>
    /// <param name="id"></param>
    /// <returns></returns>
    public async Task<Contact> GetAsync(Guid id)
    {
        var contact = await _contactsRepository
            .All()
            .ById(id)
            .FirstOrDefaultAsync();

        if (contact is null)
        {
            throw new AppException(HttpStatusCode.NotFound, "Contact does not exist");
        }
        
        return contact;
    }

    /// <summary>
    /// <see cref="IContactsService.CreateAsync"/>
    /// </summary>
    /// <param name="contact"></param>
    /// <returns></returns>
    public async Task<Contact> CreateAsync(Contact contact)
    {
        await _contactsRepository.AddAsync(contact);

        await _contactsRepository.SaveAsync();

        return contact;
    }

    /// <summary>
    /// <see cref="IContactsService.UpdateAsync"/>
    /// </summary>
    /// <param name="contact"></param>
    /// <returns></returns>
    public async Task<Contact> UpdateAsync(Contact contact)
    {
        _contactsRepository.Edit(contact);

        await _contactsRepository.SaveAsync();

        return contact;
    }

    /// <summary>
    /// <see cref="IContactsService.DeleteAsync"/>
    /// </summary>
    /// <param name="contact"></param>
    /// <returns></returns>
    public async Task<Contact> DeleteAsync(Contact contact)
    {
        _contactsRepository.Delete(contact);

        await _contactsRepository.SaveAsync();

        return contact;
    }
}