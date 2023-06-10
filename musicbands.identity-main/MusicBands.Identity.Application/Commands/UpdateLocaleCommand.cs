using MusicBands.Identity.Api.Models;
using MusicBands.Identity.Application.Commands._Base;
using FluentValidation;
using MediatR;

namespace MusicBands.Identity.Application.Commands;

public class UpdateLocaleCommand : IRequest<IdentityModel>, IValidatabe
{
    public Guid Id { get; }
    
    public string Locale { get; }
    
    public UpdateLocaleCommand(Guid id, string locale)
    {
        Id = id;
        Locale = locale;
    }

    #region validation
    
    private class Validator : AbstractValidator<UpdateLocaleCommand>
    {
        public Validator()
        {
            RuleFor(x => x.Id).NotEmpty();
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