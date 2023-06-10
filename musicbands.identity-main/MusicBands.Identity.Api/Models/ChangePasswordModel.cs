using FluentValidation;

namespace MusicBands.Identity.Api.Models;

public class ChangePasswordModel
{
    public string OldPassword { get; set; }
    
    public string NewPassword { get; set; }
    
    private class Validator : AbstractValidator<ChangePasswordModel>
    {
        public Validator()
        {
            RuleFor(x => x.OldPassword).NotNull().NotEmpty();
            RuleFor(x => x.NewPassword).NotNull().NotEmpty();
        }
    }
}