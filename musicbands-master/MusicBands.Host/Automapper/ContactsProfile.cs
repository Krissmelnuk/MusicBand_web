using AutoMapper;
using MusicBands.Api.Models.Contacts;
using MusicBands.Domain.Entities;

namespace MusicBands.Host.Automapper;

public class ContactsProfile : Profile
{
    public ContactsProfile()
    {
        CreateMap<Contact, ContactModel>();
    }
}