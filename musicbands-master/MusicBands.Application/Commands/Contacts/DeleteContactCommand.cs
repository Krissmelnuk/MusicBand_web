using MusicBands.Application.Commands._Base;
using MusicBands.Domain.Entities;
using FluentValidation;
using MediatR;

namespace MusicBands.Application.Commands.Contacts;

public class DeleteContactCommand : IRequest<Contact>, IValidatabe
{
    public Guid Id { get; }

    public DeleteContactCommand(Guid id)
    {
        Id = id;
    }
    
    #region validation

    private class Validator : AbstractValidator<DeleteContactCommand>
    {
        public Validator()
        {
            RuleFor(x => x.Id).NotNull().NotEmpty();
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