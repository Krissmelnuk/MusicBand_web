using FluentValidation;

namespace MusicBands.Emails.Api.Models;

/// <summary>
/// Represents model for broadcasting email between group of receivers
/// </summary>
public class BroadcastEmailModel
{
    /// <summary>
    /// Contains receiver emails
    /// </summary>
    public string[] To { get; set; }
    
    /// <summary>
    /// Contains email type
    /// </summary>
    public string Type { get; set; }
    
    /// <summary>
    /// Contains email locale
    /// </summary>
    public string Locale { get; set; }
    
    /// <summary>
    /// Contains email parameters
    /// </summary>
    public EmailParameterModel[] Params { get; set; }
    
    /// <summary>
    /// Broadcast email model validator
    /// </summary>
    public class Validator: AbstractValidator<BroadcastEmailModel>
    {
        public Validator()
        {
            RuleFor(x => x.To).NotNull().NotEmpty();
            RuleForEach(x => x.To).NotNull().NotEmpty().EmailAddress();
            RuleFor(x => x.Type).NotNull().NotEmpty();
            RuleFor(x => x.Locale).NotNull().NotEmpty();
            RuleForEach(x => x.Params).SetValidator(new EmailParameterModel.Validator());
            RuleFor(x => x.Params).NotNull();
        }
    }
}