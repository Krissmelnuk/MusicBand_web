using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MusicBands.Domain.Entities;
using MusicBands.Shared.Data.Mappers;

namespace MusicBands.Data.Mappers;

/// <summary>
/// Likes mapper
/// </summary>
public class LikesMapper : BaseEntityMapper<Like>
{
    /// <summary>
    /// Configures Like entity
    /// </summary>
    /// <param name="builder"></param>
    public override void Configure(EntityTypeBuilder<Like> builder)
    {
        base.Configure(builder);

        builder
            .HasOne(x => x.Band)
            .WithMany(x => x.Likes)
            .HasForeignKey(x => x.BandId);
    }
}