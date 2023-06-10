using System.Text;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using MusicBands.Identity.Application.Options;

namespace MusicBands.Identity.Application.Utils.TokenGenerator;

/// <summary>
/// <see cref="ITokenGenerator"/>
/// </summary>
public class JwtTokenGenerator : ITokenGenerator
{
    private readonly TokenGenerationOptions _options;

    public JwtTokenGenerator(IOptions<TokenGenerationOptions> options)
    {
        _options = options.Value;
    }

    /// <summary>
    /// <see cref="ITokenGenerator.Generate"/>
    /// </summary>
    /// <param name="claims"></param>
    /// <param name="now"></param>
    /// <returns></returns>
    public (string token, DateTime expiresAt) Generate(Claim[] claims, DateTime now)
    {
        var tokenHandler = new JwtSecurityTokenHandler();
        var key = Encoding.ASCII.GetBytes(_options.Secret);
        var expires = now.AddMinutes(_options.ExpirationInMinutes);
        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(claims),
            Issuer = _options.Issuer,
            Audience = _options.Audience,
            Expires = expires,
            SigningCredentials = new SigningCredentials(
                new SymmetricSecurityKey(key), 
                SecurityAlgorithms.HmacSha256Signature)
        };

        var token = tokenHandler.CreateToken(tokenDescriptor);
        return (tokenHandler.WriteToken(token), expires);
    }
}