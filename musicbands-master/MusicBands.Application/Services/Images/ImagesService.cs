using System.Net;
using Microsoft.EntityFrameworkCore;
using MusicBands.Data.Queries;
using MusicBands.Domain.Entities;
using MusicBands.Shared.Data.Queries;
using MusicBands.Shared.Data.Repository;
using MusicBands.Shared.Exceptions;

namespace MusicBands.Application.Services.Images;

/// <summary>
/// <see cref="IImagesService"/>
/// </summary>
public class ImagesService : IImagesService
{
    private readonly IGeneralRepository<Image> _images;

    public ImagesService(IGeneralRepository<Image> images)
    {
        _images = images;
    }

    /// <summary>
    /// <see cref="IImagesService.GetAsync"/>
    /// </summary>
    /// <param name="id"></param>
    /// <returns></returns>
    public async Task<Image> GetAsync(Guid id)
    {
        var image = await _images
            .All()
            .ById(id)
            .FirstOrDefaultAsync();

        if (image is null)
        {
            throw new AppException(HttpStatusCode.NotFound, "Image does not exist");
        }

        return image;
    }

    /// <summary>
    /// <see cref="IImagesService.GetByBandIdAsync"/>
    /// </summary>
    /// <param name="bandId"></param>
    /// <returns></returns>
    public async Task<Image[]> GetByBandIdAsync(Guid bandId)
    {
        var images = await _images
            .All()
            .RelatedToBand(bandId)
            .ToArrayAsync();

        return images;
    }

    /// <summary>
    /// <see cref="IImagesService.CreateAsync"/>
    /// </summary>
    /// <param name="image"></param>
    /// <returns></returns>
    public async Task<Image> CreateAsync(Image image)
    {
        await _images.AddAsync(image);
        
        await _images.SaveAsync();

        return image;
    }

    /// <summary>
    /// <see cref="IImagesService.DeleteAsync"/>
    /// </summary>
    /// <param name="image"></param>
    /// <returns></returns>
    public async Task<Image> DeleteAsync(Image image)
    {
        _images.Delete(image);

        await _images.SaveAsync();

        return image;
    }
}