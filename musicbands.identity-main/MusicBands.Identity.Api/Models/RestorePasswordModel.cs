using FluentValidation;

namespace MusicBands.Identity.Api.Models;

public class RestorePasswordModel
{
    public string Email { get; set; }
    
    public string NewPassword { get; set; }
    
    public string ResetPasswordToken { get; set; }
    
    private class Validator : AbstractValidator<RestorePasswordModel>
    {
        public Validator()
        {
            RuleFor(x => x.Email).NotNull().NotEmpty().EmailAddress();
            RuleFor(x => x.NewPassword).NotNull().NotEmpty();
            RuleFor(x => x.ResetPasswordToken).NotNull().NotEmpty();
        }
    }
}