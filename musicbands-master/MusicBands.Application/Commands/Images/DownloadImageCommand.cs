using Amazon.S3.Model;
using FluentValidation;
using MediatR;
using MusicBands.Application.Commands._Base;

namespace MusicBands.Application.Commands.Images;

public class DownloadImageCommand : IRequest<GetObjectResponse>, IValidatabe
{
    public string Key { get; }
    
    public DownloadImageCommand(string key)
    {
        Key = key;
    }
    
    #region validation

    private class Validator : AbstractValidator<DownloadImageCommand>
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