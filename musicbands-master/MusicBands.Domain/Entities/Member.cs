using MusicBands.Domain.Enums;
using MusicBands.Domain.Interfaces;
using MusicBands.Shared.Data.Entities;

namespace MusicBands.Domain.Entities;

public class Member : BaseAuditEntity, IBandRelated
{
    public string Name { get; set; }
    
    public string Avatar { get; set; }
    
    public MemberRole Role { get; protected set; }
    
    public Guid BandId { get; protected set; }
    
    #region navigation properties
    
    public Band Band { get; protected set; }
    
    public ICollection<MemberDetails> Details { get; protected set; }

    #endregion

    /// <summary>
    /// Protected constructor for EF compatibility
    /// </summary>
    protected Member()
    {
        
    }
    
    public Member(
        Band band,
        string name,
        string avatar,
        MemberRole role)
    {
        BandId = band.Id;
        Name = name;
        Role = role;
        Avatar = avatar;
    }
}