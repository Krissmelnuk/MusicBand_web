using FluentValidation;

namespace MusicBands.Api.Models.Members;

public class MemberDetailsModel
{
    public string Locale { get; set; }
    
    public string Bio { get; set; }
    
    public class Validator : AbstractValidator<MemberDetailsModel>
    {
        public Validator()
        {
            RuleFor(x => x.Locale).NotNull().NotEmpty().MaximumLength(50);
            RuleFor(x => x.Bio).NotNull().NotEmpty().MaximumLength(350);
        }
    }
}
