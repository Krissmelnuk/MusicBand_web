using System.Reflection;
using Amazon.S3;
using FluentValidation;
using FluentValidation.AspNetCore;
using Microsoft.EntityFrameworkCore;
using MusicBands.Application.CommandHandlers._Base;
using MusicBands.Application.Commands.Bands;
using MusicBands.Application.Services.Bands;
using MusicBands.Data.Context;
using MusicBands.Shared.Data.Context;
using MusicBands.Shared.Data.Managers.CacheManager;
using MusicBands.Shared.Data.Managers.TransactionManager;
using MusicBands.Shared.Data.Repository;
using MusicBands.Shared.Utils.AuthTicket;
using MusicBands.Application.Services.Contacts;
using Serilog.Sinks.Elasticsearch;
using Microsoft.AspNetCore.Mvc;
using MusicBands.Api.Models.Bands;
using MusicBands.Application.Services.Links;
using MusicBands.Host.Filters;
using Serilog.Exceptions;
using Serilog;
using MediatR;
using Microsoft.OpenApi.Models;
using MusicBands.Application.Options;
using MusicBands.Application.Services.Contents;
using MusicBands.Application.Services.Images;
using MusicBands.Application.Services.Members;

namespace MusicBands.Host.Extensions;

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
        services.AddScoped<IBandsService, BandsService>();
        services.AddScoped<ILinksService, LinksService>();
        services.AddScoped<IImagesService, ImagesService>();
        services.AddScoped<IContactsService, ContactsService>();
        services.AddScoped<IContentService, ContentService>();
        services.AddScoped<IMembersService, MembersService>();

        // Utils
        services.AddScoped<IAuthTicket, AuthTicket>();
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
        services.AddMediatR(Assembly.GetAssembly(typeof(CreateBandCommand)) ?? throw new InvalidOperationException())
            .AddTransient(typeof(IPipelineBehavior<,>), typeof(LoggerPipelineBehavior<,>))
            .AddTransient(typeof(IPipelineBehavior<,>), typeof(ValidatorPipelineBehavior<,>));
    }

    /// <summary>
    /// Adds blob storage
    /// </summary>
    /// <param name="services"></param>
    /// <param name="configuration"></param>
    public static void AddBlobStorage(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddDefaultAWSOptions(configuration.GetAWSOptions());
        services.AddAWSService<IAmazonS3>();
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
    /// Apply options
    /// </summary>
    /// <param name="services"></param>
    /// <param name="configuration"></param>
    public static void ApplyOptions(this IServiceCollection services, IConfiguration configuration)
    {
        services.Configure<AmazonS3Options>(configuration.GetSection(nameof(AmazonS3Options)));
    }
    
    public static void AddAndConfigureMvc(this IServiceCollection services)
    {
        services.AddMvc(options =>
            {
                options.Filters.Add(typeof(GlobalExceptionFilter));
                options.Filters.Add(typeof(ModelValidationFilter));
            })
            .AddFluentValidation(option =>
            {
                option.DisableDataAnnotationsValidation = false;
            });

        var validators = AssemblyScanner.FindValidatorsInAssemblyContaining<CreateBandModel>();

        foreach (var validator in validators)
        {
            services.Add(ServiceDescriptor.Transient(validator.InterfaceType, validator.ValidatorType));
        }

        services.Configure<ApiBehaviorOptions>(options =>
        {
            options.SuppressModelStateInvalidFilter = true;
        });
    }
    
    /// <summary>
    /// Configure logging
    /// </summary>
    /// <param name="builder"></param>
    /// <param name="configuration"></param>
    public static void ConfigureLogging(ConfigureHostBuilder builder, IConfiguration configuration)
    {
        var environment = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");

        builder.UseSerilog((_, loggerConfiguration) =>
        {
            loggerConfiguration
                .Enrich.FromLogContext()
                .Enrich.WithExceptionDetails()
                .Enrich.WithMachineName()
                .WriteTo.Debug()
                .WriteTo.Console()
                .WriteTo.Elasticsearch(ConfigureElasticSink())
                .Enrich.WithProperty("Environment", environment)
                .ReadFrom.Configuration(configuration);
        });
    }

    private static ElasticsearchSinkOptions ConfigureElasticSink()
    {
        var elasticUrl = Environment.GetEnvironmentVariable("BONSAI_URL");
        
        return new ElasticsearchSinkOptions(new Uri(elasticUrl ?? throw new InvalidOperationException()))
        {
            AutoRegisterTemplate = true,
            IndexFormat = "music-bands-api"
        };
    }
}