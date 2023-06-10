using Microsoft.EntityFrameworkCore;
using MusicBands.Data.Mappers;
using MusicBands.Domain.Entities;
using MusicBands.Shared.Data.Context;

namespace MusicBands.Data.Context;

public class DataContext : DbContext, IApplicationDbContext
{
    public DbContext Instance => this;
    
    public DataContext(DbContextOptions<DataContext> options) : base(options)
    {
    }
    
    public DbSet<Band> Bands { get; set; }
    
    public DbSet<Link> Links { get; set; }
    
    public DbSet<Like> Likes { get; set; }
    
    public DbSet<View> Views { get; set; }
    
    public DbSet<Image> Images { get; set; }
    
    public DbSet<Content> Content { get; set; }
    
    public DbSet<Member> Members { get; set; }

    public DbSet<Contact> Contacts { get; set; }

    public DbSet<BandAccess> BandAccesses { get; set; }

    public DbSet<MemberDetails> MemberDetails { get; set; }
    
    /// <summary>
    /// Use this method to access to Fluent Api on migrations
    /// May be used for creating indexes or some special mapping
    /// More information: https://www.learnentityframeworkcore.com/configuration/fluent-api
    /// </summary>
    /// <param name="modelBuilder"></param>
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfiguration(new BandsMapper());
        modelBuilder.ApplyConfiguration(new LinksMapper());
        modelBuilder.ApplyConfiguration(new LikesMapper());
        modelBuilder.ApplyConfiguration(new ViewsMapper());
        modelBuilder.ApplyConfiguration(new ImagesMapper());
        modelBuilder.ApplyConfiguration(new ContentMapper());
        modelBuilder.ApplyConfiguration(new MembersMapper());
        modelBuilder.ApplyConfiguration(new ContactsMapper());
        modelBuilder.ApplyConfiguration(new BandAccessMapper());
        modelBuilder.ApplyConfiguration(new MemberDetailsMapper());
    }
}