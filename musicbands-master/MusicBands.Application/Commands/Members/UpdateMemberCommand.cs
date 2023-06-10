using Microsoft.AspNetCore.Http;
using MusicBands.Application.Commands._Base;
using MusicBands.Domain.Entities;
using MusicBands.Domain.Enums;
using FluentValidation;
using MediatR;

namespace MusicBands.Application.Commands.Members;

public class UpdateMemberCommand : IRequest<Member>, IValidatabe
{
    public Guid Id { get; }
    
    public string Name { get; }
    
    public IFormFile Avatar { get; }
    
    public MemberRole Role { get; }

    public IDictionary<string, string> Details { get; }
    
    public UpdateMemberCommand(
        Guid id, 
        string name, 
        IFormFile avatar, 
        MemberRole role, 
        IDictionary<string, string> details)
    {
        Id = id;
        Name = name;
        Avatar = avatar;
        Role = role;
        Details = details;
    }
    
    #region validation

    private class Validator : AbstractValidator<UpdateMemberCommand>
    {
        public Validator()
        {
            RuleFor(x => x.Id).NotEmpty();
            RuleFor(x => x.Role).IsInEnum();
            RuleFor(x => x.Name).NotNull().NotEmpty().MaximumLength(100);
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