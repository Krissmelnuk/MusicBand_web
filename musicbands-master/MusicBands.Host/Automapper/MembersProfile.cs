using AutoMapper;
using MusicBands.Api.Models.Members;
using MusicBands.Domain.Entities;

namespace MusicBands.Host.Automapper;

public class MembersProfile : Profile
{
    public MembersProfile()
    {
        CreateMap<Member, MemberModel>();
        
        CreateMap<MemberDetails, MemberDetailsModel>();
    }
}