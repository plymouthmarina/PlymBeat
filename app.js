var express = require('express')
,   app     = express()
,   path    = require('path');

var port = process.env.PORT || 8080;

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.get('*', function (req, res) {
  res.render('pages/index');
});

app.listen(port, function () {
  console.log("go to " + port);
});