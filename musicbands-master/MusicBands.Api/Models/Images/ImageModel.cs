using MusicBands.Domain.Enums;

namespace MusicBands.Api.Models.Images;

public class ImageModel
{
    public Guid Id { get; set; }
    
    public Guid BandId { get; set; }
    
    public string Key { get; set; }
    
    public ImageType Type { get; set; }
}