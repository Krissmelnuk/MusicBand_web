using MusicBands.Shared.Data.Entities;

namespace MusicBands.Domain.Entities;

public class MemberDetails : BaseAuditEntity
{
    public string Bio { get; }
    
    public string Locale { get; protected set; }
    
    public Guid MemberId { get; protected set; }
    
    #region navigation properties
    
    public Member Member { get; protected set; }

    #endregion
    
    /// <summary>
    /// Protected constructor for EF compatibility
    /// </summary>
    protected MemberDetails()
    {
        
    }
    
    /// <summary>
    /// Protected constructor for EF compatibility
    /// </summary>
    public MemberDetails(
        string bio,
        string locale)
    {
        Bio = bio;
        Locale = locale;
    }
    
    /// <summary>
    /// Protected constructor for EF compatibility
    /// </summary>
    public MemberDetails(
        string bio,
        string locale,
        Member member)
    {
        Bio = bio;
        Locale = locale;
        MemberId = member.Id;
    }
}