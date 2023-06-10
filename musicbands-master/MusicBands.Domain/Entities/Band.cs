using System.Net;
using MusicBands.Domain.Enums;
using MusicBands.Shared.Data.Entities;
using MusicBands.Shared.Exceptions;

namespace MusicBands.Domain.Entities;

public class Band : BaseSoftDeletableEntity
{
    public string Url { get; set; }
    
    public string Name { get; set; }
    
    public BandStatus Status { get; set; }
    
    public Rating Rating { get; protected set; }
    
    #region navigation properties
    
    public ICollection<BandAccess> Accesses { get; protected set; }
    
    public ICollection<Link> Links { get; protected set; }

    public ICollection<Image> Images { get; protected set; }
    
    public ICollection<Contact> Contacts { get; protected set; }
    
    public ICollection<Content> Content { get; protected set; }
    
    public ICollection<Member> Members { get; protected set; }

    public ICollection<Like> Likes { get; protected set; }
    
    public ICollection<View> Views { get; protected set; }

    #endregion

    /// <summary>
    /// Protected constructor for EF compatibility
    /// </summary>
    protected Band()
    {
        Rating = new Rating();
        Accesses = new List<BandAccess>();
        Links = new List<Link>();
        Images = new List<Image>();
        Contacts = new List<Contact>();
        Content = new List<Content>();
        Members = new List<Member>();
        Likes = new List<Like>();
        Views = new List<View>();
    }
    
    public Band(string url, string name, Guid userId) : this()
    {
        Url = url;
        Name = name;
        Status = BandStatus.Draft;
        Accesses = new List<BandAccess>
        {
            new (userId, AccessType.Owner)
        };
    }
    
    #region Logic

    /// <summary>
    /// Likes band
    /// </summary>
    public void Like()
    {
        Rating.IncrementLike();
        
        Likes.Add(new Like(this));
    }
    
    /// <summary>
    /// View band band
    /// </summary>
    public void View()
    {
        Rating.IncrementViews();
        
        Views.Add(new View(this));
    }

    /// <summary>
    /// Publishes band
    /// </summary>
    public void Publish()
    {
        Status = BandStatus.Published;
    }
    
    /// <summary>
    /// Marks band as draft
    /// </summary>
    public void MarkAsDraft()
    {
        Status = BandStatus.Draft;
    }

    /// <summary>
    /// Verifies permission
    /// </summary>
    /// <param name="userId"></param>
    /// <param name="requireOwner"></param>
    public void VerifyPermission(Guid userId, bool requireOwner = false)
    {
        var access = Accesses.FirstOrDefault(x => x.UserId == userId);

        if (access is null)
        {
            throw new AppException(HttpStatusCode.Forbidden, "You have no access to this band.");
        }

        if (requireOwner && access.Type != AccessType.Owner)
        {
            throw new AppException(HttpStatusCode.Forbidden, "You have no access to this band.");
        }
    }
    
    #endregion
}