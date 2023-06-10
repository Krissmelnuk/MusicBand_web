using FluentValidation;

namespace MusicBands.Api.Models.Links;

public class UpdateLinkModel
{
    public Guid Id { get; set; }
    
    public string Name { get; set; }
    
    public string Description { get; set; }
    
    public string Value { get; set; }
    
    public bool IsPublic { get; set; }
    
    public class Validator : AbstractValidator<UpdateLinkModel>
    {
        public Validator()
        {
            RuleFor(x => x.Id).NotNull().NotEmpty();
            RuleFor(x => x.Value).NotNull().NotEmpty().MaximumLength(100);
            RuleFor(x => x.Name).NotNull().NotEmpty().MaximumLength(100);
            RuleFor(x => x.Description).MaximumLength(250);
        }
    }
}