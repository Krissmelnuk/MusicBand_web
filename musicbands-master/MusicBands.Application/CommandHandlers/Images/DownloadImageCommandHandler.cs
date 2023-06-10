using System.Net;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using MusicBands.Application.Commands.Images;
using MusicBands.Application.Options;
using MusicBands.Shared.Exceptions;
using Amazon.S3;
using Amazon.S3.Model;
using MediatR;

namespace MusicBands.Application.CommandHandlers.Images;

public class DownloadImageCommandHandler : IRequestHandler<DownloadImageCommand, GetObjectResponse>
{
    private readonly AmazonS3Options _options;
    private readonly IAmazonS3 _s3Client;
    private readonly ILogger _logger;
    
    public DownloadImageCommandHandler(
        IOptions<AmazonS3Options> options, 
        IAmazonS3 s3Client, 
        ILogger<DownloadImageCommandHandler> logger)
    {
        _options = options.Value;
        _s3Client = s3Client;
        _logger = logger;
    }
    
    public async Task<GetObjectResponse> Handle(DownloadImageCommand command, CancellationToken cancellationToken)
    {
        _logger.LogInformation($"Started downloading image with [Key] = {command.Key}");
        
        var s3Object = await _s3Client.GetObjectAsync(
            bucketName: _options.BucketName,
            key: command.Key, 
            cancellationToken: cancellationToken
        );

        if (s3Object is null)
        {
            _logger.LogInformation($"Failed downloading image with [Key] = {command.Key}. Image does npt exist.");
            
            throw new AppException(HttpStatusCode.NotFound, "Image does not exist");
        }
        
        _logger.LogInformation($"Finished downloading image with [Key] = {command.Key}");

        return s3Object;
    }
}