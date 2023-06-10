using FluentValidation;

namespace MusicBands.Identity.Api.Models;

public class SignInModel
{
    public string Email { get; set; }
    
    public string Password { get; set; }
    
    private class Validator : AbstractValidator<SignInModel>
    {
        public Validator()
        {
            RuleFor(x => x.Email).NotNull().NotEmpty().EmailAddress();
            RuleFor(x => x.Password).NotNull().NotEmpty();
        }
    }
}