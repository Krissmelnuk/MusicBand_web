using FluentValidation;

namespace MusicBands.Api.Models.Links;

public class CreateLinkModel
{
    public Guid BandId { get; set; }
    
    public string Name { get; set; }
    
    public string Description { get; set; }
    
    public string Value { get; set; }
    
    public bool IsPublic { get; set; }
    
    public int Type { get; set; }
    
    public class Validator : AbstractValidator<CreateLinkModel>
    {
        public Validator()
        {
            RuleFor(x => x.BandId).NotNull().NotEmpty();
            RuleFor(x => x.Value).NotNull().NotEmpty().MaximumLength(100);
            RuleFor(x => x.Name).NotNull().NotEmpty().MaximumLength(100);
            RuleFor(x => x.Description).MaximumLength(250);
            RuleFor(x => x.Type).GreaterThan(0);
        }
    }
}