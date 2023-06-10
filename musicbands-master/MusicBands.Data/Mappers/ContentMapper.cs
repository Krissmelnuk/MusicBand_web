using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MusicBands.Domain.Entities;
using MusicBands.Shared.Data.Mappers;

namespace MusicBands.Data.Mappers;

/// <summary>
/// Content mapper
/// </summary>
public class ContentMapper : BaseEntityMapper<Content>
{
    /// <summary>
    /// Configures content entity
    /// </summary>
    /// <param name="builder"></param>
    public override void Configure(EntityTypeBuilder<Content> builder)
    {
        base.Configure(builder);
        
        builder.ToTable("Content");  
            
        builder.Property(x => x.Data).HasColumnType("nvarchar(max)");
        
        builder.Property(x => x.Locale).HasColumnType("nvarchar(50)");

        builder
            .HasOne(x => x.Band)
            .WithMany(x => x.Content)
            .HasForeignKey(x => x.BandId);
    }
}