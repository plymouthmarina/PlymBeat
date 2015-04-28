var express       = require('express');
var http          = require('http');
var mongoose      = require('mongoose');
var Topic         = require('./topic');

var app           = express();

var port = process.env.PORT || 8080;

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

var uristring = process.env.DB_URI || 'mongodb://test:test@ds063769.mongolab.com:63769/plymbeattest';

mongoose.connect(uristring, function (err, res) {
  if (err) console.log('cant connect to mongo at: ' + uristring, err);
  if (err) throw err;

  console.log("Successfully connected to " + uristring);
});

app.get('*', function (req, res) {
  res.render('pages/index');
});

var server = http.createServer(app).listen(port, function () {
  console.log('express server listening on port ' + port);
});

var io = require('socket.io').listen(server);

io.on('connection', function (socket) {
  console.log('a user connected');

  socket.on('disconnect', function() {
    console.log('a user disconnected');
  });

  socket.on('question', function(data) {
    console.log(data);

    // insert question into database
    var doc = new Topic({
      id: Date.now(),
      question: data.question,
      timestamp: Date.now(),
      answers: []
    });

    doc.save(function (err) {
      if (err) throw err;

      console.log("Topic saved successfully");
    });

    socket.emit('question', doc);
  });

  socket.on('answer', function(answer) {
    // answer object needs to contain _id & answer

    // inserts answer to question and returns the updated topic
    var query = { id: answer.id };

    Topic.findOneAndUpdate(query, { 
      $push: { 
        answers: { 
          answer: answer.answer, 
          timestamp: Date.now() 
        }
      }
    }, function (err, doc) {
      if (err) throw err;

      console.log("Successfully updated: " + doc.id);
      socket.emit('answer', doc);
      console.log("answer:", doc);

    });

  });

  socket.on('error', function (err) {
    console.error(err.stack);
  });
});