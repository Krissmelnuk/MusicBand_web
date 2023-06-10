using FluentValidation;

namespace MusicBands.Api.Models.Content;

public class UpdateContentModel
{
    public Guid Id { get; set; }
    
    public string Data { get; set; }
    
    public class Validator : AbstractValidator<UpdateContentModel>
    {
        public Validator()
        {
            RuleFor(x => x.Id).NotEmpty();
        }
    }
}