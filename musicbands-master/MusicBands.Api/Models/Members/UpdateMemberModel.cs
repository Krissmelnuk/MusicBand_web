using FluentValidation;
using Microsoft.AspNetCore.Http;
using MusicBands.Domain.Enums;

namespace MusicBands.Api.Models.Members;

public class UpdateMemberModel
{
    public Guid Id { get; set; }
    
    public string Name { get; set; }
    
    public IFormFile Avatar { get; set; }
    
    public MemberRole Role { get; set; }
    
    public MemberDetailsModel[] Details { get; set; }
    
    public class Validator : AbstractValidator<UpdateMemberModel>
    {
        public Validator()
        {
            RuleFor(x => x.Id).NotEmpty();
            RuleFor(x => x.Role).IsInEnum();
            RuleFor(x => x.Name).NotNull().NotEmpty().MaximumLength(100);
            RuleForEach(x => x.Details).SetValidator(new MemberDetailsModel.Validator());
        }
    }
}