namespace MusicBands.Identity.Api.Models;

public class AuthModel
{
    public string AccessToken { get; set; }
    
    public DateTime ExpiresAt { get; set; }
    
    public IdentityModel Identity { get; set; }
}