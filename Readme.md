# Dynamic Image Generation with Azure Functions Sample

This is a code sample based on Jimp library.

The sample uses the technique described in this blog post and will add a line of text

![Sample Image](/images/sample.jpg)

## Running
This code runs via VS code with Azure Functions add in. To modify the text once running append a query string

```
http://localhost:7071/api/say?text=Hello%20Demo
```

Before running you will need a free api key from https://thecatapi.com/ and add it to local.settings.json file.

```json
{
  "IsEncrypted": false,
  "Values": {
    "AzureWebJobsStorage": "",
    "FUNCTIONS_WORKER_RUNTIME": "node",
    "CAT_KEY": "KEY_HERE"
  }
}

```

## About the Code
This is demo code to show how to use Jimp with Azure functions and can be improved. You may want to look at https://github.com/bitprj/dynamic-cat-api where this code has been used with plain javascript and extended to include colour and font changes.