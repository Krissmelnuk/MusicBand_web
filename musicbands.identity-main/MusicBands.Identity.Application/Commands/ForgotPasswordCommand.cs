using MusicBands.Identity.Application.Commands._Base;
using FluentValidation;
using MediatR;

namespace MusicBands.Identity.Application.Commands;

public class ForgotPasswordCommand : IRequest, IValidatabe
{
    public string Email { get; }
    
    public ForgotPasswordCommand(string email)
    {
        Email = email;
    }

    #region validation

    private class Validator : AbstractValidator<ForgotPasswordCommand>
    {
        public Validator()
        {
            RuleFor(x => x.Email).NotNull().NotEmpty().EmailAddress();
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