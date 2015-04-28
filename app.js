var express       = require('express');
var http          = require('http');
var mongoose      = require('mongoose');

var port = process.env.PORT || 8080;

var app           = express();


app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

mongoose.connect('mongodb://localhost/plymbeat');


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
    var obj = {
      _id: getNextSequence('topicid'),
      question: data.question,
      timestamp: Date.now(),
      answers: []
    };

    db.topics.insert(obj);

    socket.emit('question', obj);
    console.log("question", obj );
  });

  socket.on('answer', function(answer) {
    // answer object needs to contain _id & answer
    var topicsCol = db.collection('topics');
    // inserts answer to question and returns the updated topic
    var topic = db.topics.findAndModify( {
      query: { _id: answer._id },
      update: { $push: { answers: { 
        answer: answer.answer, 
        timestamp: Date.now() 
      } } },
      new: true
    });

    socket.emit('answer', { topic: topic});
    console.log("answer:", topic);
  });

  socket.on('error', function (err) {
    console.error(err.stack);
  });

});

function getNextSequence(name) {

  var countersCol = db.collection('counters');
  console.log(countersCol.find({}));

  var ret = countersCol.findAndModify(
    {
      query: { _id: name },
      update: { $inc: { seq: 1 } },
      new: true
    }
  );

  return ret.seq;
}
