using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MusicBands.Emails.Domain.Entities;
using MusicBands.Shared.Data.Mappers;

namespace MusicBands.Emails.Data.Mappers;

/// <summary>
/// Email templates mapper
/// </summary>
public class EmailTemplatesMapper : BaseEntityMapper<EmailTemplate>
{
    /// <summary>
    /// Configures Email templates entity
    /// </summary>
    /// <param name="builder"></param>
    public override void Configure(EntityTypeBuilder<EmailTemplate> builder)
    {
        base.Configure(builder);
            
        builder.Property(x => x.Locale).HasColumnType("nvarchar(100)");
        
        builder.Property(x => x.Type).HasColumnType("nvarchar(100)");
        
        builder.Property(x => x.Subject).HasColumnType("nvarchar(100)");

        builder.Property(x => x.Body).HasColumnType("nvarchar(max)");

        builder.HasIndex(x => new { x.Locale, x.Type}).IsUnique();
    }
}