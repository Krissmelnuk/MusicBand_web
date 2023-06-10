using MusicBands.Identity.Api.Models;
using MusicBands.Identity.Application.Commands._Base;
using FluentValidation;
using MediatR;

namespace MusicBands.Identity.Application.Commands;

public class SignUpCommand : IRequest<AuthModel>, IValidatabe
{
    public string Email { get; }
    
    public string Password { get; }
    
    public string FirstName { get; }
    
    public string LastName { get; }
    
    public string Locale { get; }
    
    public SignUpCommand(
        string email, 
        string password, 
        string firstName, 
        string lastName, 
        string locale)
    {
        Email = email;
        Password = password;
        FirstName = firstName;
        LastName = lastName;
        Locale = locale;
    }
    
    #region validation
    
    private class Validator : AbstractValidator<SignUpCommand>
    {
        public Validator()
        {
            RuleFor(x => x.Email).NotNull().NotEmpty().EmailAddress();
            RuleFor(x => x.Password).NotNull().NotEmpty();
            RuleFor(x => x.FirstName).NotNull().NotEmpty();
            RuleFor(x => x.LastName).NotNull().NotEmpty();
            RuleFor(x => x.Locale).NotNull().NotEmpty();
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