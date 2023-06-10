using FluentValidation;
using MusicBands.Domain.Enums;

namespace MusicBands.Api.Models.Content;

public class CreateContentModel
{
    public Guid BandId { get; set; }
    
    public string Data { get; set; }
    
    public string Locale { get; set; }
    
    public ContentType Type { get; set; }
    
    public class Validator : AbstractValidator<CreateContentModel>
    {
        public Validator()
        {
            RuleFor(x => x.BandId).NotEmpty();
            RuleFor(x => x.Locale).NotNull().NotEmpty().MaximumLength(50);
            RuleFor(x => x.Type).IsInEnum();
        }
    }
}