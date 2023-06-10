using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MusicBands.Domain.Entities;
using MusicBands.Shared.Data.Mappers;

namespace MusicBands.Data.Mappers;

/// <summary>
/// Members mapper
/// </summary>
public class MemberDetailsMapper : BaseEntityMapper<MemberDetails>
{
    /// <summary>
    /// Configures image entity
    /// </summary>
    /// <param name="builder"></param>
    public override void Configure(EntityTypeBuilder<MemberDetails> builder)
    {
        base.Configure(builder);
            
        builder.Property(x => x.Bio).HasColumnType("nvarchar(350)");
        
        builder.Property(x => x.Locale).HasColumnType("nvarchar(50)");

        builder
            .HasOne(x => x.Member)
            .WithMany(x => x.Details)
            .HasForeignKey(x => x.MemberId);
    }
}