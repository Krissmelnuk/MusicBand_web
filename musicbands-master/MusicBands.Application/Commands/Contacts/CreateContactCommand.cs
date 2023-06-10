using MusicBands.Application.Commands._Base;
using MusicBands.Domain.Entities;
using MusicBands.Domain.Enums;
using FluentValidation;
using MediatR;

namespace MusicBands.Application.Commands.Contacts;

public class CreateContactCommand : IRequest<Contact>, IValidatabe
{
    public Guid BandId { get; }
    public Guid UserId { get; }
    public string Name { get; }
    public string Description { get; }
    public string Value { get; }
    public bool IsPublic { get; }
    public ContactType Type { get; }

    public CreateContactCommand(
        Guid bandId,
        Guid userId,
        string name, 
        string description,
        string value, 
        bool isPublic, 
        ContactType type)
    {
        Name = name;
        Description = description;
        Value = value;
        IsPublic = isPublic;
        Type = type;
        BandId = bandId;
        UserId = userId;
    }
    
    #region validation

    private class Validator : AbstractValidator<CreateContactCommand>
    {
        public Validator()
        {
            RuleFor(x => x.BandId).NotEmpty();
            RuleFor(x => x.UserId).NotEmpty();
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