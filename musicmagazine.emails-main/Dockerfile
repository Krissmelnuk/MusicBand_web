FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build-env
WORKDIR /app

COPY . .

RUN dotnet restore MusicBands.Emails.sln
RUN dotnet publish -c Release -o /dist

# Stage 2
FROM mcr.microsoft.com/dotnet/aspnet:6.0
WORKDIR /app

COPY --from=build-env /dist .

CMD ASPNETCORE_URLS=http://*:$PORT dotnet MusicBands.Emails.Host.dll
