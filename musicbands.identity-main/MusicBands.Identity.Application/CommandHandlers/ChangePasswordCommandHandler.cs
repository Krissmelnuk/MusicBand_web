using System.Net;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;
using MusicBands.Identity.Application.Commands;
using MusicBands.Identity.Domain.Entities;
using MusicBands.Shared.Exceptions;
using MediatR;

namespace MusicBands.Identity.Application.CommandHandlers;

public class ChangePasswordCommandHandler : IRequestHandler<ChangePasswordCommand, Unit>
{
    private readonly UserManager<User> _userManager;
    private readonly ILogger _logger;

    public ChangePasswordCommandHandler(
        UserManager<User> userManager, 
        ILogger<ChangePasswordCommandHandler> logger)
    {
        _userManager = userManager;
        _logger = logger;
    }
    
    public async Task<Unit> Handle(ChangePasswordCommand command, CancellationToken cancellationToken)
    {
        _logger.LogInformation($"Started change password for user with [Id] = {command.UserId}");

        var user = await GetUserAsync(command.UserId.ToString());

        var result = await _userManager.ChangePasswordAsync(
            user: user,
            currentPassword: command.OldPassword,
            newPassword: command.NewPassword
        );

        if (result.Errors.Any())
        {
            var error = result.Errors.First().Description;
            
            _logger.LogInformation($"Failed change password for user with [Id] = {command.UserId}. {error}");
            
            throw new AppException(HttpStatusCode.BadRequest, error);
        }
        
        _logger.LogInformation($"Finished change password for user with [Id] = {command.UserId}");
        
        return Unit.Value;
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
        
        _logger.LogError($"Change password for user with [Id] = {id} failed. User dow not exist.");
            
        throw new AppException(HttpStatusCode.BadRequest, "User does not exist.");
    }
    
    #endregion
}