using MusicBands.Application.Commands._Base;
using MusicBands.Domain.Entities;
using MusicBands.Domain.Enums;
using FluentValidation;
using MediatR;

namespace MusicBands.Application.Commands.Contents;

public class CreateContentCommand : IRequest<Content>, IValidatabe
{
    public Guid BandId { get; }
    
    public Guid UserId { get; }
    
    public string Data { get; }
    
    public string Locale { get; }
    
    public ContentType Type { get; }
    
    public CreateContentCommand(
        Guid bandId, 
        Guid userId, 
        string data, 
        string locale, 
        ContentType type)
    {
        BandId = bandId;
        UserId = userId;
        Data = data;
        Locale = locale;
        Type = type;
    }
    
    #region validation
    
    private class Validator : AbstractValidator<CreateContentCommand>
    {
        public Validator()
        {
            RuleFor(x => x.BandId).NotEmpty();
            RuleFor(x => x.UserId).NotEmpty();
            RuleFor(x => x.Locale).NotNull().NotEmpty().MaximumLength(50);
            RuleFor(x => x.Type).IsInEnum();
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