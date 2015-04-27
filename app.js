var express = require('express')
,   app     = express()
,   path    = require('path');

var port = process.env.PORT || 8080;

app.get('/', function (req, res) {
  res.render('pages/index');
});

app.listen(port);
console.log("go to " + port);