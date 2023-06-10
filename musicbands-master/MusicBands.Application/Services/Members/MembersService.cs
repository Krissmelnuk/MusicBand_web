using System.Net;
using Microsoft.EntityFrameworkCore;
using MusicBands.Data.Queries;
using MusicBands.Domain.Entities;
using MusicBands.Shared.Data.Queries;
using MusicBands.Shared.Data.Repository;
using MusicBands.Shared.Exceptions;

namespace MusicBands.Application.Services.Members;

/// <summary>
/// <see cref="IMembersService"/>
/// </summary>
public class MembersService : IMembersService
{
    private readonly IGeneralRepository<Member> _membersRepository;

    public MembersService(IGeneralRepository<Member> membersRepository)
    {
        _membersRepository = membersRepository;
    }

    /// <summary>
    /// <see cref="IMembersService.GetAsync"/>
    /// </summary>
    /// <param name="id"></param>
    /// <returns></returns>
    public async Task<Member> GetAsync(Guid id)
    {
        var member = await _membersRepository
            .All()
            .ById(id)
            .FirstOrDefaultAsync();

        if (member is null)
        {
            throw new AppException(HttpStatusCode.NotFound, "Member does not exist");
        }

        return member;
    }

    /// <summary>
    /// <see cref="IMembersService.SelectAsync"/>
    /// </summary>
    /// <param name="bandId"></param>
    /// <returns></returns>
    public async Task<Member[]> SelectAsync(Guid bandId)
    {
        var members = await _membersRepository
            .All()
            .RelatedToBand(bandId)
            .IncludeDetails()
            .AsNoTracking()
            .ToArrayAsync();

        return members;
    }

    /// <summary>
    /// <see cref="IMembersService.CreateAsync"/>
    /// </summary>
    /// <param name="member"></param>
    /// <returns></returns>
    public async Task<Member> CreateAsync(Member member)
    {
        await _membersRepository.AddAsync(member);

        await _membersRepository.SaveAsync();

        return member;
    }

    /// <summary>
    /// <see cref="IMembersService.DeleteAsync"/>
    /// </summary>
    /// <param name="member"></param>
    /// <returns></returns>
    public async Task<Member> DeleteAsync(Member member)
    {
        _membersRepository.Delete(member);
        
        await _membersRepository.SaveAsync();

        return member;
    }
}