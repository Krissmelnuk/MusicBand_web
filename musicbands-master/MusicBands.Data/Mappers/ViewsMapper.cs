using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MusicBands.Domain.Entities;
using MusicBands.Shared.Data.Mappers;

namespace MusicBands.Data.Mappers;

/// <summary>
/// Views mapper
/// </summary>
public class ViewsMapper: BaseEntityMapper<View>
{
    /// <summary>
    /// Configures Like entity
    /// </summary>
    /// <param name="builder"></param>
    public override void Configure(EntityTypeBuilder<View> builder)
    {
        base.Configure(builder);

        builder
            .HasOne(x => x.Band)
            .WithMany(x => x.Views)
            .HasForeignKey(x => x.BandId);
    }
}