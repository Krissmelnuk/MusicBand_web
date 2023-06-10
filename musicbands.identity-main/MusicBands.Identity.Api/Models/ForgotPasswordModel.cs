using FluentValidation;

namespace MusicBands.Identity.Api.Models;

public class ForgotPasswordModel
{
    public string Email { get; set; }
    
    private class Validator : AbstractValidator<ForgotPasswordModel>
    {
        public Validator()
        {
            RuleFor(x => x.Email).NotNull().NotEmpty().EmailAddress();
        }
    }
}