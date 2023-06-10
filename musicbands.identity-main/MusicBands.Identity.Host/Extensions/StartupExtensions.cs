using System.Reflection;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MusicBands.Identity.Api.Models;
using MusicBands.Identity.Application.CommandHandlers._Base;
using MusicBands.Identity.Application.Commands;
using MusicBands.Identity.Data.Context;
using MusicBands.Identity.Domain.Entities;
using MusicBands.Identity.Host.Filters;
using MusicBands.Shared.Data.Context;
using MusicBands.Shared.Data.Managers.CacheManager;
using MusicBands.Shared.Data.Managers.TransactionManager;
using MusicBands.Shared.Data.Repository;
using MusicBands.Shared.Utils.AuthTicket;
using MusicBands.Identity.Application.Utils.TokenGenerator;
using MusicBands.Identity.Application.Options;
using MusicBands.Identity.Application.Utils.DateTimeProvider;
using Microsoft.OpenApi.Models;
using FluentValidation.AspNetCore;
using FluentValidation;
using MediatR;
using MusicBands.Emails.Api.Options;
using MusicBands.Emails.Api.WebClients;

namespace MusicBands.Identity.Host.Extensions;

public static class StartupExtensions
{
    /// <summary>
    /// Apply all application options
    /// </summary>
    /// <param name="services"></param>
    /// <param name="configuration"></param>
    public static void ApplyOptions(this IServiceCollection services, IConfiguration configuration)
    {
        services.Configure<TokenGenerationOptions>(configuration.GetSection(nameof(TokenGenerationOptions)));
    }

    /// <summary>
    /// Registered Data Context
    /// </summary>
    /// <param name="services"></param>
    /// <param name="configuration"></param>
    /// <returns></returns>
    public static void AddApplicationDbContext(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddDbContext<DataContext>(options =>
        {
#if DEBUG

            if (configuration.GetValue<bool>("TraceSql"))
            {
                options.UseLoggerFactory(LoggerFactory.Create(builder => { builder.AddConsole(); }));
            }

#endif

            options.UseSqlServer(configuration.GetConnectionString("DataBase"),
                o => o.UseQuerySplittingBehavior(QuerySplittingBehavior.SplitQuery));
        });

        services.AddScoped<IApplicationDbContext>(provider =>
            provider.GetService<DataContext>() ?? throw new InvalidOperationException());
    }

    /// <summary>
    /// Registered identity
    /// </summary>
    /// <param name="services"></param>
    /// <returns></returns>
    public static void AddIdentity(this IServiceCollection services)
    {
        services
            .AddDefaultIdentity<User>()
            .AddEntityFrameworkStores<DataContext>();
    }

    /// <summary>
    /// Register services
    /// </summary>
    /// <param name="services"></param>
    public static void RegisterServices(this IServiceCollection services)
    {
        // Database
        services.AddScoped(typeof(IGeneralRepository<>), typeof(GeneralRepository<>));
        services.AddScoped(typeof(ICacheManager<>), typeof(CacheManager<>));
        services.AddScoped<ITransactionManager, TransactionManager>();

        // Utils
        services.AddScoped<IAuthTicket, AuthTicket>();
        services.AddScoped<ITokenGenerator, JwtTokenGenerator>();
        services.AddScoped<IDateTimeProvider, DateTimeProvider>();
    }

    /// <summary>
    /// Migrates database
    /// </summary>
    /// <param name="application"></param>
    /// <returns></returns>
    public static void MigrateDatabase(this WebApplication application)
    {
        using var scope = application.Services.CreateScope();

        var context = scope.ServiceProvider.GetService<DataContext>();

        context?.Database.Migrate();
    }

    /// <summary>
    /// Adds mediator
    /// </summary>
    /// <param name="services"></param>
    public static void AddMediator(this IServiceCollection services)
    {
        services.AddMediatR(Assembly.GetAssembly(typeof(SignUpCommand)) ?? throw new InvalidOperationException())
            .AddTransient(typeof(IPipelineBehavior<,>), typeof(LoggerPipelineBehavior<,>))
            .AddTransient(typeof(IPipelineBehavior<,>), typeof(ValidatorPipelineBehavior<,>));
    }

    /// <summary>
    /// Registers swagger
    /// </summary>
    /// <param name="services"></param>
    public static void AddSwagger(this IServiceCollection services)
    {
        services.AddSwaggerGen(x =>
        {
            x.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
            {
                Description = @"JWT Authorization header using the Bearer scheme. \r\n\r\n 
                      Enter 'Bearer' [space] and then your token in the text input below.
                      \r\n\r\nExample: 'Bearer my_auth_token'",
                Name = "Authorization",
                In = ParameterLocation.Header,
                Type = SecuritySchemeType.ApiKey,
                Scheme = "Bearer",
            });
            
            x.AddSecurityRequirement(new OpenApiSecurityRequirement
            {
                {
                    new OpenApiSecurityScheme
                    {
                        Reference = new OpenApiReference
                        {
                            Type = ReferenceType.SecurityScheme,
                            Id = "Bearer"
                        },
                        Scheme = "oauth2",
                        Name = "Bearer",
                        In = ParameterLocation.Header,
                    },
                    new List<string>()
                }
            });
        });
    }
    
    /// <summary>
    /// Registers emails web client
    /// </summary>
    /// <param name="services"></param>
    /// <param name="configuration"></param>
    public static void AddEmailsWebClient(this IServiceCollection services, IConfiguration configuration)
    {
        services.Configure<EmailsServiceOptions>(configuration.GetSection(nameof(EmailsServiceOptions)));

        services.AddScoped<IEmailsServiceWebClient, EmailsServiceWebClient>();
    }

    public static void AddAndConfigureMvc(this IServiceCollection services)
    {
        services.AddMvc(options =>
            {
                options.Filters.Add(typeof(GlobalExceptionFilter));
                options.Filters.Add(typeof(ModelValidationFilter));
            })
            .AddFluentValidation(option => { option.DisableDataAnnotationsValidation = false; });

        var validators = AssemblyScanner.FindValidatorsInAssemblyContaining<SignUpModel>();

        foreach (var validator in validators)
        {
            services.Add(ServiceDescriptor.Transient(validator.InterfaceType, validator.ValidatorType));
        }

        services.Configure<ApiBehaviorOptions>(options => { options.SuppressModelStateInvalidFilter = true; });
    }
}