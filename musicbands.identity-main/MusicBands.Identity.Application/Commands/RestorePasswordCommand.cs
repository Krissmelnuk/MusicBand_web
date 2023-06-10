using MusicBands.Identity.Api.Models;
using MusicBands.Identity.Application.Commands._Base;
using FluentValidation;
using MediatR;

namespace MusicBands.Identity.Application.Commands;

public class RestorePasswordCommand : IRequest<AuthModel>, IValidatabe
{
    public string Email { get; }
    
    public string NewPassword { get; }
    
    public string ResetPasswordToken { get; }
    
    public RestorePasswordCommand(
        string email, 
        string newPassword, 
        string resetPasswordToken)
    {
        Email = email;
        NewPassword = newPassword;
        ResetPasswordToken = resetPasswordToken;
    }
    
    #region validation
    
    private class Validator : AbstractValidator<RestorePasswordCommand>
    {
        public Validator()
        {
            RuleFor(x => x.Email).NotNull().NotEmpty().EmailAddress();
            RuleFor(x => x.NewPassword).NotNull().NotEmpty();
            RuleFor(x => x.ResetPasswordToken).NotNull().NotEmpty();
        }
    }

    /// <summary>
    /// <see cref="IValidatabe.IsValid"/>
    /// </summary>
    /// <returns></returns>
    public bool IsValid() => new Validator().Validate(this).IsValid;

    /// <summary>
    /// <see cref="IValidatabe.Validate"/>
    /// </summary>
    public void Validate() => new Validator().ValidateAndThrow(this);
    
    #endregion
}