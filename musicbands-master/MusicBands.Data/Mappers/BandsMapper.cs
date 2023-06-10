using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MusicBands.Domain.Entities;
using MusicBands.Shared.Data.Mappers;

namespace MusicBands.Data.Mappers;

/// <summary>
/// Band mapper
/// </summary>
public class BandsMapper : BaseEntityMapper<Band>
{
    /// <summary>
    /// Configures Band entity
    /// </summary>
    /// <param name="builder"></param>
    public override void Configure(EntityTypeBuilder<Band> builder)
    {
        base.Configure(builder);
            
        builder.Property(x => x.Url).HasColumnType("nvarchar(100)");
        
        builder.Property(x => x.Name).HasColumnType("nvarchar(100)");

        builder.OwnsOne(x => x.Rating);

        builder.HasIndex(x => x.Url).IsUnique();
    }
}