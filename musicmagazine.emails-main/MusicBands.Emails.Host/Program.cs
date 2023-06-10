using MusicBands.Emails.Host.Extensions;
using MusicBands.Shared.Authorization;

var builder = WebApplication.CreateBuilder(args);

var configuration = builder.Configuration;

builder.Services.AddMediator();
builder.Services.AddControllers();
builder.Services.RegisterServices();
builder.Services.AddAndConfigureMvc();
builder.Services.ConfigureOptions(configuration);
builder.Services.AddApiAuthorization(configuration);
builder.Services.AddApplicationDbContext(configuration);
builder.Services.AddHttpContextAccessor();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwagger();

var app = builder.Build();

app.UseCors(x => x
    .SetIsOriginAllowed(_ => true)
    .AllowAnyHeader()
    .AllowAnyMethod()
    .AllowCredentials()
    .WithExposedHeaders("X-MiniProfiler-Ids"));

app.UseSwagger();
app.UseSwaggerUI();
app.MigrateDatabase();
app.UseHttpsRedirection();
app.MapControllers();
app.Run();

