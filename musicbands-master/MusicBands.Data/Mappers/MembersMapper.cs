using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MusicBands.Domain.Entities;
using MusicBands.Shared.Data.Mappers;

namespace MusicBands.Data.Mappers;

/// <summary>
/// Members mapper
/// </summary>
public class MembersMapper : BaseEntityMapper<Member>
{
    /// <summary>
    /// Configures image entity
    /// </summary>
    /// <param name="builder"></param>
    public override void Configure(EntityTypeBuilder<Member> builder)
    {
        base.Configure(builder);
            
        builder.Property(x => x.Name).HasColumnType("nvarchar(100)");
        
        builder.Property(x => x.Avatar).HasColumnType("nvarchar(250)");

        builder
            .HasOne(x => x.Band)
            .WithMany(x => x.Members)
            .HasForeignKey(x => x.BandId);
    }
}