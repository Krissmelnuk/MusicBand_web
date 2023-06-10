using System.Text;
using MusicBands.Emails.Domain.Entities;

namespace MusicBands.Emails.Application.Utils.EmailFactory;

/// <summary>
/// <see cref="IEmailFactory"/>
/// </summary>
public class EmailFactory : IEmailFactory
{
    private const string OpenSeparator = "{";
    private const string CloseSeparator = "}";
    
    /// <summary>
    /// <see cref="IEmailFactory.Create"/>
    /// </summary>
    /// <param name="emailTemplate"></param>
    /// <param name="data"></param>
    /// <returns></returns>
    public string Create(EmailTemplate emailTemplate, IDictionary<string, string> data)
    {
        var @params = GetParams(emailTemplate.Body);
        if (!@params.Any())
        {
            return emailTemplate.Body;
        }
            
        var builder = new StringBuilder(emailTemplate.Body);

        foreach (var param in @params)
        {
            var paramKey = ExcludeSeparators(param);
            
            if (!data.ContainsKey(paramKey))
            {
                continue;
            }

            var value = data[paramKey];
            
            builder.Replace(param, value);
        }

        return builder.ToString();
    }

    #region private

    /// <summary>
    /// Returns all parameters in email body
    /// </summary>
    /// <param name="body"></param>
    /// <returns></returns>
    private string[] GetParams(string body)
    {
        var @params = new List<string>();
        var startIndex = -1;

        do
        {
            startIndex = body.IndexOf(OpenSeparator, startIndex + 1, StringComparison.Ordinal);
            var endIndex = body.IndexOf(CloseSeparator, startIndex + 1, StringComparison.Ordinal);
            if (startIndex >= 0 && endIndex >= 0 )
            {
                @params.Add(body.Substring(startIndex, endIndex - startIndex + 1));
            }
        } while (startIndex > 0);

        return @params.ToArray();
    }

    /// <summary>
    /// Covers data parameter by separators
    /// </summary>
    /// <param name="dataParam"></param>
    /// <returns></returns>
    private string ExcludeSeparators(string dataParam)
    {
        return dataParam
            .Replace(OpenSeparator, string.Empty)
            .Replace(CloseSeparator, string.Empty);
    }

    #endregion
}