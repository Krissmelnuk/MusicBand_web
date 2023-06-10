using MediatR;
using Microsoft.Extensions.Logging;

namespace MusicBands.Emails.Application.CommandHandlers._Base;

public class LoggerPipelineBehavior<TRequest, TResponse> : IPipelineBehavior<TRequest, TResponse> where TRequest : IRequest<TResponse>
{
    private readonly string _commandType = typeof(TRequest).Name;
    private readonly ILogger<LoggerPipelineBehavior<TRequest, TResponse>> _logger;

    public LoggerPipelineBehavior(ILogger<LoggerPipelineBehavior<TRequest, TResponse>> logger)
    {
        _logger = logger;
    }

    public async Task<TResponse> Handle(TRequest command, CancellationToken cancellationToken, RequestHandlerDelegate<TResponse> next)
    {
        _logger.LogInformation($"[MediatR] Started processing command: {_commandType}");

        try
        {
            return await next();
        }
        catch(Exception ex)
        {
            _logger.LogError(ex, $"[MediatR] Error during MediatR command: {_commandType}. {ex.Message}.");
                
            throw;
        }
        finally
        {
            _logger.LogInformation($"[MediatR] Finished processing command: {_commandType}");
        }
    }
}
