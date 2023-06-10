using Microsoft.AspNetCore.Identity;
using MusicBands.Shared.Data.Entities.Abstractions;

namespace MusicBands.Identity.Domain.Entities;

public class User : IdentityUser, ISoftDeletable, ICreatedBy, ICreatedAt, IModifiedBy, IModifiedAt
{
    public string FirstName { get; set; }
    
    public string LastName { get; set; }
    
    public string Locale { get; set; }
    
    public Guid CreatedBy { get; set; }
    
    public DateTime CreatedAt { get; set; }
    
    public Guid? ModifiedBy { get; set; }
    
    public DateTime? ModifiedAt { get; set; }    
    
    public Guid? DeletedBy { get; set; }
    
    public DateTime? DeletedAt { get; set; }
}