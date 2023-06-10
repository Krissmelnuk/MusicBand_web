using MusicBands.Api.Models.Images;
using MusicBands.Domain.Entities;
using AutoMapper;

namespace MusicBands.Host.Automapper;

public class ImagesProfile : Profile
{
    public ImagesProfile()
    {
        CreateMap<Image, ImageModel>();
    }
}