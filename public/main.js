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
  displayQuestion();

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
    
    var answer = $('#currentAnswer').val();
    socket.emit('answer', { answer: answer });
  });

});

var frame = 1;
  
function pulseAnimation(){
   
  var top = 269 * frame;
     
  $('#pulseAnimation').css('backgroundPosition', '0px ' + '-'+ top + 'px');
  
  // frame = ++frame % 19;

  if (frame < 19){
     // frame++;
  }
  else
  {
     frame = 1; 
  }
} 

/*
function pulseAnimation(){
   
  var left = 128 * frame;
     
$('#pulseAnimation').css('backgroundPosition','-'+left+'px 0px');
 
  if (frame < 9){
   frame++;
}
else
{
   frame = 1; 
} 
*/
