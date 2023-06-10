using Microsoft.Extensions.Logging;
using MusicBands.Application.Commands.Contacts;
using MusicBands.Application.Services.Bands;
using MusicBands.Application.Services.Contacts;
using MusicBands.Domain.Entities;
using MediatR;

namespace MusicBands.Application.CommandHandlers.Contacts;

public class CreateContactCommandHandler : IRequestHandler<CreateContactCommand, Contact>
{
    private readonly IBandsService _bandsService;
    private readonly IContactsService _contactsService;
    private readonly ILogger _logger;

    public CreateContactCommandHandler(
        IBandsService bandsService, 
        IContactsService contactsService, 
        ILogger<CreateContactCommandHandler> logger)
    {
        _bandsService = bandsService;
        _contactsService = contactsService;
        _logger = logger;
    }

    public async Task<Contact> Handle(CreateContactCommand command, CancellationToken cancellationToken)
    {
        _logger.LogInformation($"Started creating contact for band with [Id] = {command.BandId}");

        var band = await _bandsService.GetAsync(command.BandId);
        
        band.VerifyPermission(command.UserId);

        var contact = new Contact(
            band: band,
            name: command.Name,
            description: command.Description,
            value: command.Value,
            isPublic: command.IsPublic,
            type: command.Type
        );

        await _contactsService.CreateAsync(contact);
        
        _logger.LogInformation($"Finished creating contact for band with [Id] = {command.BandId}");

        return contact;
    }
}