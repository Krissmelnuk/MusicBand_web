namespace MusicBands.Domain.Entities;

public class Rating
{
    public int Likes { get; protected set; }
    
    public int Views { get; protected set; }

    public void IncrementLike()
    {
        Likes++;
    }
    
    public void IncrementViews()
    {
        Views++;
    }
}