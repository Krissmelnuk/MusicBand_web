using System.Net;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;
using MusicBands.Identity.Api.Models;
using MusicBands.Identity.Application.Commands;
using MusicBands.Identity.Domain.Entities;
using MusicBands.Shared.Exceptions;
using MediatR;

namespace MusicBands.Identity.Application.CommandHandlers;

public class UpdateIdentityCommandHandler : IRequestHandler<UpdateIdentityCommand, IdentityModel>
{
    private readonly UserManager<User> _userManager;
    private readonly ILogger _logger;

    public UpdateIdentityCommandHandler(
        UserManager<User> userManager, 
        ILogger<UpdateIdentityCommandHandler> logger)
    {
        _userManager = userManager;
        _logger = logger;
    }

    public async Task<IdentityModel> Handle(UpdateIdentityCommand command, CancellationToken cancellationToken)
    {
        _logger.LogInformation($"Started updating user with [Id] = {command.Id}");

        var user = await GetUserAsync(command.Id.ToString());

        user.FirstName = command.FirstName;
        user.LastName = command.LastName;
        user.Locale = command.Locale;

        await _userManager.UpdateAsync(user);

        _logger.LogInformation($"Finished updating user with [Id] = {command.Id}");
        
        return new IdentityModel
        {
            FirstName = user.FirstName,
            LastName = user.LastName,
            Locale = user.Locale,
            Email = user.Email
        };
    }
    
    #region private
    
    /// <summary>
    /// Fetches and returns user
    /// </summary>
    /// <param name="id"></param>
    /// <returns></returns>
    /// <exception cref="AppException"></exception>
    private async Task<User> GetUserAsync(string id)
    {
        var user = await _userManager.FindByIdAsync(id);

        if (user is not null)
        {
            return user;
        }
        
        _logger.LogError($"Updating user with [Id] = {id} failed. User dow not exist.");
            
        throw new AppException(HttpStatusCode.BadRequest, "User does not exist.");
    }
    
    #endregion
}