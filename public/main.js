var current = {};

$(document).ready(function(e) {
/****************************************************
********      Websocket.io
*****************************************************/

var socket = io();

function displayQuestion () {
  console.log(current.question);
  $('#currentQuestion').text(current.question);
}

// socket.emit('answer', { answer: 'This is the answer'});
// socket.emit('question', { question: 'What is the answer of life?' });

socket.on('answer', function (data) {
  // stuff that happens after someone gives an answer
  console.log("new answer", data);

});

socket.on('question', function (data) {
  // stuff that happends after someone gives a new question
  console.log("new question", data);

  current.question = data.question;
  current.id = data.id;
  current.timestamp = data.timestamp;


  // current = data;
  // displayQuestion();

});

/*****************************************************
********      GRAPH ANIMATION
*****************************************************/

  var pulseInterval;

  // pulseInterval = setInterval(pulseAnimation,100);

  $("#submitQuestion").click(function () {
    var question = $('#questionInput').val();
    socket.emit('question', { question: question });
  });

  $("#submitAnswer").click(function(){
    // $("ol").append("<li>Appended Answer</li>");
    
    current.answer = $('#currentAnswer').val();
    // emit object with question id id and answer as properties
    socket.emit('answer', current );
    // reset current question
    current = {};
  });

});

var frame = 1;
  
function pulseAnimation(){
   
  var top = 269 * frame;
     
  $('#pulseAnimation').css('backgroundPosition', '0px ' + '-'+ top + 'px');
  
  frame = (frame + 1) % 19;
} 
