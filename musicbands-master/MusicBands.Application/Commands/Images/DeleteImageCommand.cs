using MusicBands.Application.Commands._Base;
using MusicBands.Domain.Entities;
using FluentValidation;
using MediatR;

namespace MusicBands.Application.Commands.Images;

public class DeleteImageCommand : IRequest<Image>, IValidatabe
{
    public Guid Id { get; }

    public DeleteImageCommand(Guid id)
    {
        Id = id;
    }
    
    #region validation

    private class Validator : AbstractValidator<DeleteImageCommand>
    {
        public Validator()
        {
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