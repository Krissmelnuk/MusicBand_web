using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace MusicBands.Identity.Application.Utils.TokenGenerator;

/// <summary>
/// Represents token generator
/// </summary>
public interface ITokenGenerator
{
    /// <summary>
    /// Generates and returns token with expiration date
    /// </summary>
    /// <param name="claims"></param>
    /// <param name="now"></param>
    /// <returns></returns>
    (string token, DateTime expiresAt) Generate(Claim[] claims, DateTime now);
}