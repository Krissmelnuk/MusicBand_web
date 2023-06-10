#bin/sh

set -e

DIRECTORY=$(cd `dirname $0` && pwd)
cd $DIRECTORY

echo " RESTORING NUGET PACKAGES "

dotnet restore $NUGET_PROJECT

echo " BUILDING SOLUTION "

dotnet build $NUGET_PROJECT --no-restore -c Release

echo " GENERATING NUGET PACKAGE "

VER=$(awk -F'[<>]' '/<Version>/{print $3}' $NUGET_PROJECT)
VERSION=$VER.$CI_PIPELINE_ID-beta

dotnet pack $NUGET_PROJECT -c Release --no-restore --no-build -o nupkgs /p:PackageVersion=$VERSION

echo " PUBLISHING NUGET PACKAGE "

dotnet nuget push ./nupkgs/*.nupkg -k $NUGET_API_KEY -s $NUGET_URL
