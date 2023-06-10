using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MusicBands.Domain.Entities;
using MusicBands.Shared.Data.Mappers;

namespace MusicBands.Data.Mappers;

/// <summary>
/// Links mapper
/// </summary>
public class LinksMapper : BaseEntityMapper<Link>
{
    /// <summary>
    /// Configures Band entity
    /// </summary>
    /// <param name="builder"></param>
    public override void Configure(EntityTypeBuilder<Link> builder)
    {
        base.Configure(builder);
            
        builder.Property(x => x.Name).HasColumnType("nvarchar(100)");
        
        builder.Property(x => x.Description).HasColumnType("nvarchar(250)");
        
        builder.Property(x => x.Value).HasColumnType("nvarchar(100)");

        builder
            .HasOne(x => x.Band)
            .WithMany(x => x.Links)
            .HasForeignKey(x => x.BandId);
    }
}