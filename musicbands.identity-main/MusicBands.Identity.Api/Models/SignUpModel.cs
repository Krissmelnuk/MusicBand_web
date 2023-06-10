using FluentValidation;

namespace MusicBands.Identity.Api.Models;

public class SignUpModel
{
    public string Email { get; set; }
    
    public string Password { get; set; }
    
    public string FirstName { get; set; }
    
    public string LastName { get; set; }
    
    public string Locale { get; set; }
    
    private class Validator : AbstractValidator<SignUpModel>
    {
        public Validator()
        {
            RuleFor(x => x.Email).NotNull().NotEmpty().EmailAddress();
            RuleFor(x => x.Password).NotNull().NotEmpty();
            RuleFor(x => x.FirstName).NotNull().NotEmpty();
            RuleFor(x => x.LastName).NotNull().NotEmpty();
            RuleFor(x => x.Locale).NotNull().NotEmpty();
        }
    }
}