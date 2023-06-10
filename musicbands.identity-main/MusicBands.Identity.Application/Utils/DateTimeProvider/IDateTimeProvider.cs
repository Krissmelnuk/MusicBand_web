namespace MusicBands.Identity.Application.Utils.DateTimeProvider;

/// <summary>
/// Represents date time provider
/// </summary>
public interface IDateTimeProvider
{
    /// <summary>
    /// Returns current date time
    /// </summary>
    /// <returns></returns>
    DateTime Now();
    
    /// <summary>
    /// Returns current utc date time
    /// </summary>
    /// <returns></returns>
    DateTime UtcNow();
}