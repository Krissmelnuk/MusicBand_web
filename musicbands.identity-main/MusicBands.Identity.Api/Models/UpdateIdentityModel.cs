using FluentValidation;

namespace MusicBands.Identity.Api.Models;

public class UpdateIdentityModel
{
    public string FirstName { get; set; }
    
    public string LastName { get; set; }
    
    public string Locale { get; set; }
    
    private class Validator : AbstractValidator<UpdateIdentityModel>
    {
        public Validator()
        {
            RuleFor(x => x.FirstName).NotNull().NotEmpty();
            RuleFor(x => x.LastName).NotNull().NotEmpty();
            RuleFor(x => x.Locale).NotNull().NotEmpty();
        }
    }
}