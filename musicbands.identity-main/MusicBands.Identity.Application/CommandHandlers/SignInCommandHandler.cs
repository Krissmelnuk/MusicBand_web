using System.Net;
using System.Security.Claims;
using Microsoft.AspNetCore.Identity;
using MusicBands.Identity.Api.Models;
using MusicBands.Identity.Application.Commands;
using MusicBands.Identity.Domain.Entities;
using Microsoft.Extensions.Logging;
using MusicBands.Identity.Application.Utils.TokenGenerator;
using MusicBands.Shared.Exceptions;
using MusicBands.Identity.Application.Utils.DateTimeProvider;
using MusicBands.Shared.Constants;
using MediatR;

namespace MusicBands.Identity.Application.CommandHandlers;

public class SignInCommandHandler : IRequestHandler<SignInCommand, AuthModel>
{
    private readonly UserManager<User> _userManager;
    private readonly ITokenGenerator _tokenGenerator;
    private readonly IDateTimeProvider _dateTimeProvider;
    private readonly ILogger _logger;

    public SignInCommandHandler(
        UserManager<User> userManager, 
        ITokenGenerator tokenGenerator,
        IDateTimeProvider dateTimeProvider,
        ILogger<SignInCommandHandler> logger)
    {
        _userManager = userManager;
        _tokenGenerator = tokenGenerator;
        _dateTimeProvider = dateTimeProvider;
        _logger = logger;
    }

    public async Task<AuthModel> Handle(SignInCommand command, CancellationToken cancellationToken)
    {
        _logger.LogInformation($"Started sign in user with [Email] = {command.Email}");

        var user = await GetUserAsync(command.Email);

        await VerifyPasswordAsync(user, command.Password);

        var claims = GetClaims(user);

        var (token, expiredAt) = _tokenGenerator.Generate(
            claims: claims,
            now: _dateTimeProvider.UtcNow()
        );
        
        _logger.LogInformation($"Finished sign in user with [Email] = {command.Email}");

        return new AuthModel
        {
            AccessToken = token,
            ExpiresAt = expiredAt,
            Identity = new IdentityModel
            {
                FirstName = user.FirstName,
                LastName = user.LastName,
                Locale = user.Locale,
                Email = user.Email
            }
        };
    }
    
    #region private

    /// <summary>
    /// Fetches and returns user
    /// </summary>
    /// <param name="email"></param>
    /// <returns></returns>
    /// <exception cref="AppException"></exception>
    private async Task<User> GetUserAsync(string email)
    {
        var user = await _userManager.FindByEmailAsync(email);

        if (user is not null)
        {
            return user;
        }
        
        _logger.LogError($"Sign in for user with [Email] = {email} failed. User dow not exist.");
            
        throw new AppException(HttpStatusCode.BadRequest, "Incorrect user name or password.");
    }
    
    /// <summary>
    /// Verifies user password
    /// </summary>
    /// <param name="user"></param>
    /// <param name="password"></param>
    /// <exception cref="AppException"></exception>
    private async Task VerifyPasswordAsync(User user, string password)
    {
        var passwordVerification = await _userManager.CheckPasswordAsync(user, password);

        if (!passwordVerification)
        {
            throw new AppException(HttpStatusCode.BadRequest, "Incorrect user name or password");
        }
    }

    /// <summary>
    /// Returns user claims
    /// </summary>
    /// <param name="user"></param>
    /// <returns></returns>
    private Claim[] GetClaims(User user)
    {
        return new []
        {
            new Claim(CustomClaims.UserId, user.Id)
        };
    }

    #endregion
}