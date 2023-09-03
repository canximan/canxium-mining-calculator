const express = require('express');

/**
* Express instance
* @public
*/
const app = express();

app.use(function (req, res, next) {
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self' *; font-src 'self' *; img-src 'self' *; script-src 'self' *; frame-src 'self'"
  );
  
  next();
});


// dashboard ui
app.use(express.static('public'));

app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  return next();
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + "/views/index.html")
})



module.exports = app;
