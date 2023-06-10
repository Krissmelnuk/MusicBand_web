using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MusicBands.Domain.Entities;
using MusicBands.Shared.Data.Mappers;

namespace MusicBands.Data.Mappers;

/// <summary>
/// Band access mapper
/// </summary>
public class BandAccessMapper : BaseEntityMapper<BandAccess>
{
    /// <summary>
    /// Configures Band access entity
    /// </summary>
    /// <param name="builder"></param>
    public override void Configure(EntityTypeBuilder<BandAccess> builder)
    {
        base.Configure(builder);

        builder
            .HasOne(x => x.Band)
            .WithMany(x => x.Accesses)
            .HasForeignKey(x => x.BandId);
    }
}