using FluentValidation;
using Microsoft.AspNetCore.Http;
using MusicBands.Domain.Enums;

namespace MusicBands.Api.Models.Members;

public class CreateMemberModel
{
    public Guid BandId { get; set; }
    
    public string Name { get; set; }
    
    public IFormFile Avatar { get; set; }
    
    public MemberRole Role { get; set; }
    
    public MemberDetailsModel[] Details { get; set; }
    
    public class Validator : AbstractValidator<CreateMemberModel>
    {
        public Validator()
        {
            RuleFor(x => x.BandId).NotEmpty();
            RuleFor(x => x.Role).IsInEnum();
            RuleFor(x => x.Name).NotNull().NotEmpty().MaximumLength(100);
            RuleForEach(x => x.Details).SetValidator(new MemberDetailsModel.Validator());
        }
    }
}