using System.Reflection;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using MusicBands.Emails.Api.Models;
using MusicBands.Emails.Application.CommandHandlers._Base;
using MusicBands.Emails.Application.Commands;
using MusicBands.Emails.Application.Services.Emails;
using MusicBands.Emails.Application.Services.EmailTemplates;
using MusicBands.Emails.Application.Utils.EmailFactory;
using MusicBands.Emails.Data.Context;
using MusicBands.Emails.Host.Filters;
using MusicBands.Shared.Data.Context;
using MusicBands.Shared.Data.Managers.CacheManager;
using MusicBands.Shared.Data.Managers.TransactionManager;
using MusicBands.Shared.Data.Repository;
using MusicBands.Shared.Utils.AuthTicket;
using FluentValidation.AspNetCore;
using FluentValidation;
using MediatR;
using MusicBands.Emails.Application.Options;

namespace MusicBands.Emails.Host.Extensions;

public static class StartupExtensions
{
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
                options.UseLoggerFactory(LoggerFactory.Create(builder =>
                {
                    builder.AddConsole();
                }));
            }

            #endif

            options.UseSqlServer(configuration.GetConnectionString("DataBase"), o => o.UseQuerySplittingBehavior(QuerySplittingBehavior.SplitQuery));
        });

        services.AddScoped<IApplicationDbContext>(provider => provider.GetService<DataContext>() ?? throw new InvalidOperationException());
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
        
        // Services
        services.AddScoped<IEmailTemplatesService, EmailTemplatesService>();
        services.AddScoped<IEmailsService, EmailsService>();

        // Utils
        services.AddScoped<IAuthTicket, AuthTicket>();
        services.AddScoped<IEmailFactory, EmailFactory>();
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
        services.AddMediatR(Assembly.GetAssembly(typeof(SendEmailCommand)) ?? throw new InvalidOperationException())
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
            x.AddSecurityDefinition("ApiKey", new OpenApiSecurityScheme
            {
                Description = @"ApiKey is using for internal authorization between microservices",
                Name = "ApiKey",
                In = ParameterLocation.Header,
                Type = SecuritySchemeType.ApiKey
            });
            
            x.AddSecurityRequirement(new OpenApiSecurityRequirement
            {
                {
                    new OpenApiSecurityScheme
                    {
                        Reference = new OpenApiReference
                        {
                            Type = ReferenceType.SecurityScheme,
                            Id = "ApiKey"
                        },
                        Name = "ApiKey",
                        In = ParameterLocation.Header,
                    },
                    new List<string>()
                }
            });
        });
    }

    /// <summary>
    /// Configures MVC
    /// </summary>
    /// <param name="services"></param>
    public static void AddAndConfigureMvc(this IServiceCollection services)
    {
        services.AddMvc(options =>
        {
            options.Filters.Add(typeof(GlobalExceptionFilter));
            options.Filters.Add(typeof(ModelValidationFilter));
        }).AddFluentValidation(option =>
        {
            option.DisableDataAnnotationsValidation = false;
        });

        services.AddValidatorsFromAssemblyContaining<SendEmailModel>();

        services.Configure<ApiBehaviorOptions>(options =>
        {
            options.SuppressModelStateInvalidFilter = true;
        });
    }

    /// <summary>
    /// Configure options
    /// </summary>
    /// <param name="services"></param>
    /// <param name="configuration"></param>
    public static void ConfigureOptions(this IServiceCollection services, IConfiguration configuration)
    {
        services.Configure<SendGridOptions>(configuration.GetSection(nameof(SendGridOptions)));
    }
}