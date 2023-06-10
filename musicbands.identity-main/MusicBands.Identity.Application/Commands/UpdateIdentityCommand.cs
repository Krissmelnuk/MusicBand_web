using MusicBands.Identity.Api.Models;
using MusicBands.Identity.Application.Commands._Base;
using FluentValidation;
using MediatR;

namespace MusicBands.Identity.Application.Commands;

public class UpdateIdentityCommand : IRequest<IdentityModel>, IValidatabe
{
    public Guid Id { get; }
    
    public string FirstName { get; }
    
    public string LastName { get; }
    
    public string Locale { get; }
    
    public UpdateIdentityCommand(
        Guid id, 
        string firstName, 
        string lastName, 
        string locale)
    {
        Id = id;
        FirstName = firstName;
        LastName = lastName;
        Locale = locale;
    }

    #region validation
    
    private class Validator : AbstractValidator<UpdateIdentityCommand>
    {
        public Validator()
        {
            RuleFor(x => x.Id).NotEmpty();
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