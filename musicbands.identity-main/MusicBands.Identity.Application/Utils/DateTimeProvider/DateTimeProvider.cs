namespace MusicBands.Identity.Application.Utils.DateTimeProvider;

/// <summary>
/// <see cref="IDateTimeProvider"/>
/// </summary>
public class DateTimeProvider : IDateTimeProvider
{
    /// <summary>
    /// <see cref="IDateTimeProvider.Now"/>
    /// </summary>
    /// <returns></returns>
    public DateTime Now()
    {
        return DateTime.Now;
    }

    /// <summary>
    /// <see cref="IDateTimeProvider.UtcNow"/>
    /// </summary>
    /// <returns></returns>
    public DateTime UtcNow()
    {
        return DateTime.UtcNow;
    }
}