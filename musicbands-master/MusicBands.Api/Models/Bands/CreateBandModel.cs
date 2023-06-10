using FluentValidation;

namespace MusicBands.Api.Models.Bands;

public class CreateBandModel
{
    public string Url { get; set; }
    
    public string Name { get; set; }

    public class Validator : AbstractValidator<CreateBandModel>
    {
        public Validator()
        {
            RuleFor(x => x.Url).NotNull().NotEmpty().Matches("^[a-zA-Z0-9]*$");
            RuleFor(x => x.Name).NotNull().NotEmpty().MaximumLength(100);
        }
    }
}