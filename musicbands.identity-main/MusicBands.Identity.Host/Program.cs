using MusicBands.Identity.Host.Extensions;
using MusicBands.Shared.Authentication;

var builder = WebApplication.CreateBuilder(args);

var configuration = builder.Configuration;

builder.Services.AddMediator();
builder.Services.AddIdentity();
builder.Services.AddControllers();
builder.Services.AddAndConfigureMvc();
builder.Services.AddHttpContextAccessor();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddEmailsWebClient(configuration);
builder.Services.AddApplicationDbContext(configuration);
builder.Services.AddMusicBandsAuthentication(configuration);
builder.Services.ApplyOptions(configuration);
builder.Services.RegisterServices();
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
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
app.Run();
