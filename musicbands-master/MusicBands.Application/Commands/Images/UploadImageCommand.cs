using Microsoft.AspNetCore.Http;
using MusicBands.Application.Commands._Base;
using MusicBands.Domain.Entities;
using MusicBands.Domain.Enums;
using FluentValidation;
using MediatR;

namespace MusicBands.Application.Commands.Images;

public class UploadImageCommand : IRequest<Image>, IValidatabe
{
    public Guid BandId { get; }
    
    public Guid UserId { get; }
    
    public ImageType Type { get; }
    
    public IFormFile File { get; }
    
    public UploadImageCommand(
        Guid bandId, 
        Guid userId, 
        ImageType type, 
        IFormFile file)
    {
        BandId = bandId;
        UserId = userId;
        Type = type;
        File = file;
    }
    
    #region validation

    private class Validator : AbstractValidator<UploadImageCommand>
    {
        public Validator()
        {
            RuleFor(x => x.BandId).NotEmpty();
            RuleFor(x => x.UserId).NotEmpty();
            RuleFor(x => x.Type).IsInEnum();
            RuleFor(x => x.File).NotNull();
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