using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MusicBands.Identity.Domain.Entities;

namespace MusicBands.Identity.Data.Mappers;

/// <summary>
/// Band mapper
/// </summary>
public class UserMapper : IEntityTypeConfiguration<User>
{
    /// <summary>
    /// Configures Band on entity
    /// </summary>
    /// <param name="builder"></param>
    public void Configure(EntityTypeBuilder<User> builder)
    {
        builder.Property(x => x.FirstName).HasColumnType("nvarchar(100)");
        
        builder.Property(x => x.LastName).HasColumnType("nvarchar(100)");
        
        builder.Property(x => x.Locale).HasColumnType("nvarchar(50)");
    }
}
