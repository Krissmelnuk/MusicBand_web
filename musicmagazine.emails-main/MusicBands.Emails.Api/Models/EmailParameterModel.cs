using FluentValidation;

namespace MusicBands.Emails.Api.Models;

public class EmailParameterModel
{
    /// <summary>
    /// Contains parameter key
    /// </summary>
    public string Key { get; set; }
    
    /// <summary>
    /// Contains parameter value
    /// </summary>
    public string Value { get; set; }

    /// <summary>
    /// Email parameter model validator
    /// </summary>
    public class Validator : AbstractValidator<EmailParameterModel>
    {
        public Validator()
        {
            RuleFor(x => x.Key).NotNull().NotEmpty();
            RuleFor(x => x.Value).NotNull().NotEmpty();
        }
    }
}