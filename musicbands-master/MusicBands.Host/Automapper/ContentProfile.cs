using MusicBands.Api.Models.Content;
using MusicBands.Domain.Entities;
using AutoMapper;

namespace MusicBands.Host.Automapper;

public class ContentProfile : Profile
{
    public ContentProfile()
    {
        CreateMap<Content, ContentModel>();
    }
}