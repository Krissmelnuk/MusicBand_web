using MusicBands.Application.Commands._Base;
using MusicBands.Domain.Entities;
using FluentValidation;
using MediatR;

namespace MusicBands.Application.Commands.Bands;

public class CreateBandCommand : IRequest<Band>, IValidatabe
{
    public Guid UserId { get; }
    
    public string Url { get; }
    
    public string Name { get; }

    public CreateBandCommand(Guid userId, string url, string name)
    {
        UserId = userId;
        Url = url;
        Name = name;
    }
    
    #region validation

    private class Validator : AbstractValidator<CreateBandCommand>
    {
        public Validator()
        {
            RuleFor(x => x.UserId).NotEmpty();
            RuleFor(x => x.Name).NotNull().NotEmpty();
            RuleFor(x => x.Url).NotNull().NotEmpty().Matches("^[a-zA-Z0-9]*$");
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