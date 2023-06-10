namespace MusicBands.Identity.Application.Options;

public class TokenGenerationOptions
{
    /// <summary>
    /// Token expiration in minutes
    /// </summary>
    public int ExpirationInMinutes { get; set; }
        
    /// <summary>
    /// Token Issuer
    /// </summary>
    public string Issuer { get; set; }
        
    /// <summary>
    /// Token Audience
    /// </summary>
    public string Audience { get; set; }

    /// <summary>
    /// Secret for token generation
    /// </summary>
    public string Secret { get; set; }
}