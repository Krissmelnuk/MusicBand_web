using System.Net;
using FluentValidation;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using MusicBands.Shared.Exceptions;
using MusicBands.Shared.Models;

namespace MusicBands.Emails.Host.Filters;

/// <summary>
/// <see cref="IExceptionFilter"/>
/// </summary>
public class GlobalExceptionFilter : IExceptionFilter
{
    /// <summary>
    /// <see cref="IExceptionFilter.OnException(ExceptionContext)"/>
    /// </summary>
    /// <param name="context"></param>
    public void OnException(ExceptionContext context)
    {
        var error = ExceptionToError(context.Exception);

        context.ExceptionHandled = true;

        context.Result = new ObjectResult(error)
        {
            StatusCode = (int)error.StatusCode
        };
    }

    /// <summary>
    /// Converts exception to error model
    /// </summary>
    /// <param name="exception"></param>
    /// <returns></returns>
    private static ApplicationErrorModel ExceptionToError(Exception exception)
    {
        return exception switch
        {
            AppException appEx => new ApplicationErrorModel(appEx.StatusCode, appEx.Message),
            ValidationException validationEx => new ApplicationErrorModel(HttpStatusCode.BadRequest, validationEx.Message),
            ArgumentException argumentEx => new ApplicationErrorModel(HttpStatusCode.BadRequest, argumentEx.Message),
            _ => new ApplicationErrorModel(HttpStatusCode.InternalServerError, exception.Message)
        };
    }
}
