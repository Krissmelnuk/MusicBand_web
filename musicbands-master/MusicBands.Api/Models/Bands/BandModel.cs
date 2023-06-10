using MusicBands.Api.Models.Images;

namespace MusicBands.Api.Models.Bands;

public class BandModel
{
    public Guid Id { get; set; }
    
    public string Url { get; set; }
    
    public string Name { get; set; }
    
    public int Status { get; set; }
    
    public ImageModel Image { get; set; }
    
    public RatingModel Rating { get; set; }
}