var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var topicSchema = new Schema({
  id: { type: Number, index: true },
  question: String,
  timestamp: Date,
  answers: [{ answer: String, timestamp: Date }]
});

var Topic = mongoose.model('Topic', topicSchema);

module.exports = Topic;

/*
var topic = {
  _id: 2,
  question: 'Who is Francis Drake?',
  timestamp: 120570234,
  answers: [
    { 
      'answer': 'Some dude who lived in Plymouth and kicked Spains ass!',
      'timestamp': 12307571 
    }, {
      'answer': 'My neighbour',
     'timestamp': 12307571 
    }
  ]
}
*/