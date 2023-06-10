using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MusicBands.Domain.Entities;
using MusicBands.Shared.Data.Mappers;

namespace MusicBands.Data.Mappers;

/// <summary>
/// Contact mapper
/// </summary>
public class ContactsMapper : BaseEntityMapper<Contact>
{
    /// <summary>
    /// Configures contact entity
    /// </summary>
    /// <param name="builder"></param>
    public override void Configure(EntityTypeBuilder<Contact> builder)
    {
        base.Configure(builder);
            
        builder.Property(x => x.Name).HasColumnType("nvarchar(100)");
        
        builder.Property(x => x.Description).HasColumnType("nvarchar(250)");
        
        builder.Property(x => x.Value).HasColumnType("nvarchar(100)");

        builder
            .HasOne(x => x.Band)
            .WithMany(x => x.Contacts)
            .HasForeignKey(x => x.BandId);
    }
}