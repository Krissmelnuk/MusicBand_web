using Microsoft.Extensions.Logging;
using MusicBands.Application.Commands.Contacts;
using MusicBands.Application.Services.Contacts;
using MusicBands.Domain.Entities;
using MediatR;

namespace MusicBands.Application.CommandHandlers.Contacts;

public class DeleteContactCommandHandler : IRequestHandler<DeleteContactCommand, Contact>
{
    private readonly IContactsService _contactsService;
    private readonly ILogger _logger;

    public DeleteContactCommandHandler(
        IContactsService contactsService, 
        ILogger<DeleteContactCommandHandler> logger)
    {
        _contactsService = contactsService;
        _logger = logger;
    }

    public async Task<Contact> Handle(DeleteContactCommand command, CancellationToken cancellationToken)
    {
        _logger.LogInformation($"Started deleting contact with [Id] = {command.Id}");

        var contact = await _contactsService.GetAsync(command.Id);

        contact = await _contactsService.DeleteAsync(contact);
        
        _logger.LogInformation($"Finished deleting contact with [Id] = {command.Id}");

        return contact;
    }
}