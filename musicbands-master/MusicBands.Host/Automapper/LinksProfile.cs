using AutoMapper;
using MusicBands.Api.Models.Links;
using MusicBands.Domain.Entities;

namespace MusicBands.Host.Automapper;

public class LinksProfile : Profile
{
    public LinksProfile()
    {
        CreateMap<Link, LinkModel>();
    }
}