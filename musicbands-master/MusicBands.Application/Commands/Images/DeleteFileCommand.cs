using MusicBands.Application.Commands._Base;
using FluentValidation;
using MediatR;

namespace MusicBands.Application.Commands.Images;

public class DeleteFileCommand : IRequest, IValidatabe
{
    public string Key { get; }
    
    public DeleteFileCommand(string key)
    {
        Key = key;
    }
    
    #region validation

    private class Validator : AbstractValidator<DeleteFileCommand>
    {
        public Validator()
        {
            RuleFor(x => x.Key).NotNull().NotEmpty();
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