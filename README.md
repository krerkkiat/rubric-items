# Rubric Items

## Build and push

```console
$ npm run build
$ npm run build:client
$ npm run copy
$ cd dist
$ clasp push
```

`npm run copy` copy Google Apps Script files and HTML files to dist. It then insert compiled JavaScript into `JavaScript.html`. `HtmlService.createHtmlOutputFromFile`
escape character like `<`, so it cannot be used to load `ClientCode.js` directly.
