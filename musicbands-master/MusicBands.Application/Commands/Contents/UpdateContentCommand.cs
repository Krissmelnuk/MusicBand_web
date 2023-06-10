using MusicBands.Application.Commands._Base;
using MusicBands.Domain.Entities;
using FluentValidation;
using MediatR;

namespace MusicBands.Application.Commands.Contents;

public class UpdateContentCommand : IRequest<Content>, IValidatabe
{
    public Guid Id { get; }
    
    public string Data { get; }
    
    public UpdateContentCommand(Guid id, string data)
    {
        Id = id;
        Data = data;
    }
    
    #region validation
    
    private class Validator : AbstractValidator<UpdateContentCommand>
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