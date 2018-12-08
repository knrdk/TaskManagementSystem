$publishFolder = "publish"
$destination = "publish.zip"

if(Test-path $publishFolder) {Remove-Item -Recurse -Force $publishFolder}
dotnet publish -c release -o $publishFolder

if(Test-path $destination) {Remove-item $destination}
Add-Type -assembly "system.io.compression.filesystem"
[io.compression.zipfile]::CreateFromDirectory($publishFolder, $destination)

# publish to azure
# az loging has to be performed before this scipt is executed
$appName = "kktaskapi"
$resourceGroup = "TaskManagement"
az webapp deployment source config-zip -n $appName -g $resourceGroup --src $destination
