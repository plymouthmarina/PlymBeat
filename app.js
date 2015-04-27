var express       = require('express');


var port = process.env.PORT || 8080;

var app           = express();
var server        = app.listen(port, function () { console.log("Go to " + port); });
var io            = require('socket.io').listen(server);
var db            = require('mongojs').connect('http://localhost/plymbeat', ['topics']);

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));


app.get('*', function (req, res) {
  res.render('pages/index');
});

io.on('connection', function (socket) {
  console.log('a user connected');

  socket.on('disconnect', function() {
    console.log('a user disconnected');
  });

  socket.on('question', function(data) {
    console.log(data);
    db.topics.save(data);
    socket.emit('question',{ question: data.question });
    console.log("question", data.question );
  });

  socket.on('answer', function(answer) {
    socket.emit('answer', { answer: answer});
    console.log("answer:", answer);
  });

});
