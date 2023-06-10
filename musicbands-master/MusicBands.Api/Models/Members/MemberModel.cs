using MusicBands.Domain.Enums;

namespace MusicBands.Api.Models.Members;

public class MemberModel
{
    public string Name { get; set; }
    
    public string Avatar { get; set; }
    
    public MemberRole Role { get; set; }
    
    public MemberDetailsModel[] Details { get; set; }
}