using MusicBands.Domain.Entities;

namespace MusicBands.Application.Services.Members;

/// <summary>
/// Provides methods for working with members
/// </summary>
public interface IMembersService
{
    /// <summary>
    /// Returns member by identifier
    /// </summary>
    /// <param name="id"></param>
    /// <returns></returns>
    Task<Member> GetAsync(Guid id);
    
    /// <summary>
    /// Returns members related to band
    /// </summary>
    /// <param name="bandId"></param>
    /// <returns></returns>
    Task<Member[]> SelectAsync(Guid bandId);

    /// <summary>
    /// Creates and returns member
    /// </summary>
    /// <param name="member"></param>
    /// <returns></returns>
    Task<Member> CreateAsync(Member member);

    /// <summary>
    /// Deletes member
    /// </summary>
    /// <param name="member"></param>
    /// <returns></returns>
    Task<Member> DeleteAsync(Member member);
}