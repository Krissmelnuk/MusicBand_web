using MusicBands.Application.Commands._Base;
using MusicBands.Domain.Entities;
using FluentValidation;
using MediatR;

namespace MusicBands.Application.Commands.Bands;

public class DeleteBandCommand : IRequest<Band>, IValidatabe
{
    public Guid Id { get; }
    
    public Guid UserId { get; }

    public DeleteBandCommand(Guid id, Guid userId)
    {
        Id = id;
        UserId = userId;
    }
    
    #region validation

    private class Validator : AbstractValidator<DeleteBandCommand>
    {
        public Validator()
        {
            RuleFor(x => x.Id).NotEmpty();
            RuleFor(x => x.Id).NotEmpty();
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