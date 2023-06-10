using Microsoft.Extensions.Logging;
using MusicBands.Application.Commands.Contacts;
using MusicBands.Application.Services.Contacts;
using MusicBands.Domain.Entities;
using MediatR;

namespace MusicBands.Application.CommandHandlers.Contacts;

public class UpdateContactCommandHandler : IRequestHandler<UpdateContactCommand, Contact>
{
    private readonly IContactsService _contactsService;
    private readonly ILogger _logger;

    public UpdateContactCommandHandler(
        IContactsService contactsService, 
        ILogger<UpdateContactCommandHandler> logger)
    {
        _contactsService = contactsService;
        _logger = logger;
    }

    public async Task<Contact> Handle(UpdateContactCommand command, CancellationToken cancellationToken)
    {
        _logger.LogInformation($"Started updating contact with [Id] = {command.Id}");
        
        var contact = await _contactsService.GetAsync(command.Id);

        contact.Name = command.Name;
        contact.Description = command.Description;
        contact.Value = command.Value;
        contact.IsPublic = command.IsPublic;

        await _contactsService.UpdateAsync(contact);
        
        _logger.LogInformation($"Finished updating contact with [Id] = {command.Id}");

        return contact;
    }
}