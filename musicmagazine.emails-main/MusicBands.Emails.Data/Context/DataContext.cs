using Microsoft.EntityFrameworkCore;
using MusicBands.Emails.Data.Mappers;
using MusicBands.Emails.Domain.Entities;
using MusicBands.Shared.Data.Context;

namespace MusicBands.Emails.Data.Context;

public class DataContext : DbContext, IApplicationDbContext
{
    public DbContext Instance => this;
    
    public DataContext(DbContextOptions<DataContext> options) : base(options)
    {
    }

    public DbSet<EmailTemplate> EmailTemplates { get; set; }
    
    /// <summary>
    /// Use this method to access to Fluent Api on migrations
    /// May be used for creating indexes or some special mapping
    /// More information: https://www.learnentityframeworkcore.com/configuration/fluent-api
    /// </summary>
    /// <param name="modelBuilder"></param>
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfiguration(new EmailTemplatesMapper());
    }

}