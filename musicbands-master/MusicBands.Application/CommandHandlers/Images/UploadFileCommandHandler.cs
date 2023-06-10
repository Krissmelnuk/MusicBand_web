using Microsoft.Extensions.Options;
using MusicBands.Application.Commands.Images;
using MusicBands.Application.Options;
using Amazon.S3.Model;
using Amazon.S3;
using MediatR;

namespace MusicBands.Application.CommandHandlers.Images;

public class UploadFileCommandHandler : IRequestHandler<UploadFileCommand, string>
{
    private readonly AmazonS3Options _options;
    private readonly IAmazonS3 _s3Client;
    
    public UploadFileCommandHandler(
        IOptions<AmazonS3Options> options, 
        IAmazonS3 s3Client)
    {
        _options = options.Value;
        _s3Client = s3Client;
    }

    public async Task<string> Handle(UploadFileCommand command, CancellationToken cancellationToken)
    {
        var band = command.Band;
        var file = command.File;
        var key = $"{band.Id}/{Guid.NewGuid()}_{file.FileName}";
        
        var request = new PutObjectRequest
        {
            Key = key,
            BucketName = _options.BucketName,
            InputStream = file.OpenReadStream()
        };
        
        request.Metadata.Add("Content-Type", file.ContentType);
        
        await _s3Client.PutObjectAsync(request, cancellationToken);

        return key;
    }
}