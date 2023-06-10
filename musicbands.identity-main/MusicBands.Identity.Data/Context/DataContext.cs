using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using MusicBands.Identity.Data.Mappers;
using MusicBands.Identity.Domain.Entities;
using MusicBands.Shared.Data.Context;

namespace MusicBands.Identity.Data.Context;

public class DataContext : IdentityDbContext<User>, IApplicationDbContext
{
    public DbContext Instance => this;
    
    public DataContext(DbContextOptions<DataContext> options) : base(options)
    {
    }
    
    /// <summary>
    /// Use this method to access to Fluent Api on migrations
    /// May be used for creating indexes or some special mapping
    /// More information: https://www.learnentityframeworkcore.com/configuration/fluent-api
    /// </summary>
    /// <param name="modelBuilder"></param>
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        
        modelBuilder.ApplyConfiguration(new UserMapper());
    }

}