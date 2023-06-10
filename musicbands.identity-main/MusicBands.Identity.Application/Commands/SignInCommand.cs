using MusicBands.Identity.Api.Models;
using MusicBands.Identity.Application.Commands._Base;
using FluentValidation;
using MediatR;

namespace MusicBands.Identity.Application.Commands;

public class SignInCommand : IRequest<AuthModel>, IValidatabe
{
    public string Email { get; }
    
    public string Password { get; }
    
    public SignInCommand(string email, string password)
    {
        Email = email;
        Password = password;
    }
    
    #region validation
    
    private class Validator : AbstractValidator<SignInCommand>
    {
        public Validator()
        {
            RuleFor(x => x.Email).NotNull().NotEmpty().EmailAddress();
            RuleFor(x => x.Password).NotNull().NotEmpty();
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
    /// <returns></returns>
    public void Validate() => new Validator().ValidateAndThrow(this);
    
    #endregion
}