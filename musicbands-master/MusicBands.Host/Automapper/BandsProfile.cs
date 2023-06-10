using MusicBands.Api.Models.Bands;
using MusicBands.Domain.Entities;
using MusicBands.Domain.Enums;
using AutoMapper;

namespace MusicBands.Host.Automapper;

public class BandsProfile : Profile
{
    public BandsProfile()
    {
        CreateMap<Band, BandModel>()
            .ForMember(x => x.Image,
                opt => opt.MapFrom(src => src.Images.FirstOrDefault(x => x.Type == ImageType.Profile)));
        
        CreateMap<Rating, RatingModel>();
    }
}