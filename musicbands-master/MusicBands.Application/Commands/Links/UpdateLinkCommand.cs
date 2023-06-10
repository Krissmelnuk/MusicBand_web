using MusicBands.Application.Commands._Base;
using MusicBands.Domain.Entities;
using FluentValidation;
using MediatR;

namespace MusicBands.Application.Commands.Links;

public class UpdateLinkCommand : IRequest<Link>, IValidatabe
{
    public Guid Id { get; }
    public string Name { get; }
    public string Description { get; }
    public string Value { get; }
    public bool IsPublic { get; }

    public UpdateLinkCommand(
        Guid id,
        string name, 
        string description,
        string value, 
        bool isPublic)
    {
        Name = name;
        Description = description;
        Value = value;
        IsPublic = isPublic;
        Id = id;
    }
    
    #region validation

    private class Validator : AbstractValidator<UpdateLinkCommand>
    {
        public Validator()
        {
            RuleFor(x => x.Id).NotNull().NotEmpty();
            RuleFor(x => x.Value).NotNull().NotEmpty().MaximumLength(100);
            RuleFor(x => x.Name).NotNull().NotEmpty().MaximumLength(100);
            RuleFor(x => x.Description).MaximumLength(250);
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