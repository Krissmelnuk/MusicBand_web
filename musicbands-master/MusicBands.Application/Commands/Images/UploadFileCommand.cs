using Microsoft.AspNetCore.Http;
using MusicBands.Application.Commands._Base;
using MusicBands.Domain.Entities;
using FluentValidation;
using MediatR;

namespace MusicBands.Application.Commands.Images;

public class UploadFileCommand : IRequest<string>, IValidatabe
{
    public IFormFile File { get; }
    
    public Band Band { get; }
    
    public UploadFileCommand(IFormFile file, Band band)
    {
        File = file;
        Band = band;
    }
    
    #region validation

    private class Validator : AbstractValidator<UploadFileCommand>
    {
        public Validator()
        {
            RuleFor(x => x.File).NotNull();
            RuleFor(x => x.Band).NotNull();
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