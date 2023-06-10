using FluentValidation;

namespace MusicBands.Api.Models.Bands;

public class UpdateBandModel
{
    public Guid Id { get; set; }

    public string Url { get; set; }
    
    public string Name { get; set; }
    
    public int Status { get; set; }
    
    public class Validator : AbstractValidator<UpdateBandModel>
    {
        public Validator()
        {
            RuleFor(x => x.Id).NotNull().NotEmpty();
            RuleFor(x => x.Url).NotNull().NotEmpty().Matches("^[a-zA-Z0-9]*$");
            RuleFor(x => x.Name).NotNull().NotEmpty().MaximumLength(100);
            RuleFor(x => x.Status).GreaterThan(0);
        }
    }
}