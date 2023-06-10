using Microsoft.Extensions.Options;
using MusicBands.Application.Commands.Images;
using MusicBands.Application.Options;
using Amazon.S3.Model;
using Amazon.S3;
using MediatR;

namespace MusicBands.Application.CommandHandlers.Images;

public class DeleteFileCommandHandler : IRequestHandler<DeleteFileCommand>
{
    private readonly AmazonS3Options _options;
    private readonly IAmazonS3 _s3Client;
    
    public DeleteFileCommandHandler(
        IOptions<AmazonS3Options> options, 
        IAmazonS3 s3Client)
    {
        _options = options.Value;
        _s3Client = s3Client;
    }
    
    public async Task<Unit> Handle(DeleteFileCommand command, CancellationToken cancellationToken)
    {
        var deleteObjectRequest = new DeleteObjectRequest
        {
            BucketName = _options.BucketName,
            Key = command.Key
        };

        await _s3Client.DeleteObjectAsync(deleteObjectRequest, cancellationToken);
        
        return Unit.Value;
    }
}