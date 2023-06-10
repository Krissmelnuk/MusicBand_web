using System.Net;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using MusicBands.Shared.Models;

namespace MusicBands.Identity.Host.Filters;

/// <summary>
/// <see cref="IActionFilter"/>
/// </summary>
public class ModelValidationFilter : Attribute, IActionFilter
{
    public void OnActionExecuted(ActionExecutedContext context)
    {
        if (!context.ModelState.IsValid)
        {
            var errorModel = ModelStateToError(context.ModelState);
            context.Result = new BadRequestObjectResult(errorModel);
        }
    }

    public void OnActionExecuting(ActionExecutingContext context)
    {
        if (!context.ModelState.IsValid)
        {
            var errorModel = ModelStateToError(context.ModelState);
            context.Result = new BadRequestObjectResult(errorModel);
        }
    }

    #region private

    private static ApplicationErrorModel ModelStateToError(ModelStateDictionary state)
    {
        var errorMessages = state
            .Values
            .SelectMany(x => x.Errors)
            .Select(x => x.ErrorMessage)
            .ToArray();

        return new ApplicationErrorModel(HttpStatusCode.BadRequest, errorMessages);
    }

    #endregion
}

