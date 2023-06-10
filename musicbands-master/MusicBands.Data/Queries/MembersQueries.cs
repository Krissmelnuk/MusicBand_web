using Microsoft.EntityFrameworkCore;
using MusicBands.Domain.Entities;

namespace MusicBands.Data.Queries;

/// <summary>
/// Provides queries for member entities
/// </summary>
public static class MembersQueries
{
    /// <summary>
    /// Includes members details
    /// </summary>
    /// <param name="members"></param>
    /// <returns></returns>
    public static IQueryable<Member> IncludeDetails(this IQueryable<Member> members)
    {
        return members.Include(x => x.Details);
    }
}