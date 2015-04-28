var mongoose = require('mongoose');

var schema = new mongoose.Schema({
  question: String,
  timestamp: Date,
  answer: String
})

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