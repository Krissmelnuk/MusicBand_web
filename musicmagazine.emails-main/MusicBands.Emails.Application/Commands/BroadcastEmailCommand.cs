using MusicBands.Emails.Application.Commands._Base;
using FluentValidation;
using MediatR;

namespace MusicBands.Emails.Application.Commands;

public class BroadcastEmailCommand : IRequest, IValidatabe
{
    public string[] To { get; }
    
    public string Type { get; }
    
    public string Locale { get; }
    
    public IDictionary<string, string> Params { get; }
    
    public BroadcastEmailCommand(
        string[] to, 
        string type, 
        string locale, 
        IDictionary<string, string> @params)
    {
        To = to;
        Type = type;
        Locale = locale;
        Params = @params;
    }
    
    #region validation

    private class Validator: AbstractValidator<BroadcastEmailCommand>
    {
        public Validator()
        {
            RuleFor(x => x.To).NotNull().NotEmpty();
            RuleForEach(x => x.To).NotNull().NotEmpty().EmailAddress();
            RuleFor(x => x.Type).NotNull().NotEmpty();
            RuleFor(x => x.Locale).NotNull().NotEmpty();
            RuleFor(x => x.Params).NotNull();
        }
    }

    /// <summary>
    /// <see cref="IValidatabe.IsValid"/>
    /// </summary>
    /// <returns></returns>
    public bool IsValid() => new Validator().Validate(this).IsValid;

    /// <summary>
    /// <see cref="IValidatabe.Validate"/>
    /// </summary>
    public void Validate() => new Validator().ValidateAndThrow(this);

    #endregion
}