using MusicBands.Application.Commands._Base;
using FluentValidation;
using MediatR;

namespace MusicBands.Application.Commands.Bands;

public class ViewBandCommand: IRequest<Unit>, IValidatabe
{
    public Guid Id { get; }
 
    public ViewBandCommand(Guid id)
    {
        Id = id;
    }
    
    #region validation

    private class Validator : AbstractValidator<ViewBandCommand>
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