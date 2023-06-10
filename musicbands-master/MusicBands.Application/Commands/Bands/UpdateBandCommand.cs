using MusicBands.Application.Commands._Base;
using MusicBands.Domain.Entities;
using MusicBands.Domain.Enums;
using FluentValidation;
using MediatR;

namespace MusicBands.Application.Commands.Bands;

public class UpdateBandCommand : IRequest<Band>, IValidatabe
{
    public Guid Id { get; }
    
    public Guid UserId { get; }
    
    public string Url { get; }
    
    public string Name { get; }
    
    public BandStatus Status { get; }

    public UpdateBandCommand(
        Guid id, 
        Guid userId,
        string url, 
        string name, 
        BandStatus status)
    {
        Id = id;
        UserId = userId;
        Url = url;
        Name = name;
        Status = status;
    }
    
    #region validation

    private class Validator : AbstractValidator<UpdateBandCommand>
    {
        public Validator()
        {
            RuleFor(x => x.Id).NotEmpty();
            RuleFor(x => x.UserId).NotEmpty();
            RuleFor(x => x.Url).NotNull().NotEmpty().Matches("^[a-zA-Z0-9]*$");
            RuleFor(x => x.Name).NotNull().NotEmpty();
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