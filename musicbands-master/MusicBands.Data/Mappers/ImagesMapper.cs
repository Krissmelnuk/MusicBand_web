using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MusicBands.Domain.Entities;
using MusicBands.Shared.Data.Mappers;

namespace MusicBands.Data.Mappers;

/// <summary>
/// Images mapper
/// </summary>
public class ImagesMapper : BaseEntityMapper<Image>
{
    /// <summary>
    /// Configures image entity
    /// </summary>
    /// <param name="builder"></param>
    public override void Configure(EntityTypeBuilder<Image> builder)
    {
        base.Configure(builder);
            
        builder.Property(x => x.Key).HasColumnType("nvarchar(250)");

        builder
            .HasOne(x => x.Band)
            .WithMany(x => x.Images)
            .HasForeignKey(x => x.BandId);
    }
}