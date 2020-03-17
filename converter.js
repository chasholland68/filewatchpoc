var CloudmersiveConvertApiClient = require('cloudmersive-convert-api-client');
var fs = require("fs");
var args =  process.argv;
var targetFile = args[2];
var submissions = "C:\\FileWatcherApplicationFiles\\Submissions\\";
var conversions = "C:\\FileWatcherApplicationFiles\\Conversions\\";


if(targetFile.indexOf("\\") > -1)
{
   var targetArray = targetFile.split("\\");
   targetFile = targetArray[targetArray.length-1];
}


var defaultClient = CloudmersiveConvertApiClient.ApiClient.instance;
// Configure API key authorization: Apikey
var Apikey = defaultClient.authentications['Apikey'];
Apikey.apiKey = '4657467b-04f8-4857-8312-3f7a332b4baa';
var apiInstance = new CloudmersiveConvertApiClient.ConvertDocumentApi();




var postMove = function()
{
    console.log('moved');
    var inputFile = Buffer.from(fs.readFileSync(conversions + targetFile).buffer); // File | Input file to perform the operation on.
    apiInstance.convertDocumentXlsxToPdf(inputFile, postConversion);
}

var postConversion = function(error, data, response) {
    if (error) {
      console.error(error);
    } else {

      fs.writeFile(conversions + targetFile.replace(".xls", ".pdf"),data, (err) => {
          if (err) throw err;
          console.log('It\'s saved!');
        })
    }
  };


fs.rename(submissions + targetFile, conversions + targetFile,postMove);

