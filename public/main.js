var current = {};

$(document).ready(function(e) {
/****************************************************
********      Websocket.io
*****************************************************/

var randomNum;

setInterval(function(){
  randomNum = Math.round(Math.random() * 10 ) / 10;
  console.log(randomNum);
  if(randomNum <= 0.3){
    $(".path").attr("class","path fast");
  }
  else if(randomNum > 0.3 && randomNum <= 0.6){
    $(".path").attr("class","path steady");
  }
  else {
    $(".path").attr("class","path slow");
  };
}, 5000); 

$('#history').hide();

$("#downButton").on("click", function(){

  if($(this).attr("src") === "assets/up_button2.png") {
    $(this).attr("src","assets/down_button2.png");
  }
  else
  {
    $(this).attr("src","assets/up_button2.png");
  }
    
    $("#history").slideToggle();
});

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

  // reset current question
  current = {};
  // -> hide current question
  $('#currentQuestion').hide();
  // -> show question input field
  $('#questionInput').text('');
  $('#questionForm').show();
  // -> hide answer input field
  $('#answerForm').hide();
  // reset input field to blank
  $('#currentAnswer').text('');

  // append question + answer to history (w/ unique id)
  $('#history').append(
    '<div id="' + data.answer.id + '">' + 
      '<div class="historyQuestion">' + 
        '<p class = "capital">Q</p>' + 
        '<p>' + data.answer.question + '</p>' + 
      '</div>' +
      '<div class="historyAnswer">' +
        '<p  class = "capital">A</p>' +
        '<p>' + data.answer.answer + '</p>' +
      '</div>' +
    '</div>');
});

socket.on('question', function (data) {
  // stuff that happens after someone gives a new question
  console.log("new question", data);

  current.question = data.question;
  current.id = data.id;
  current.timestamp = data.timestamp;

  // -> show new question
  $('#currentQuestion').text(current.question).show();
  // -> hide question input
  $('#questionForm').hide();
  // reset input field to blank
  $('#questionInput').text('');
  // -> show answer input
  $('#answerForm').show();


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
    
    current.answer = $('#currentAnswer').val();
    // emit object with question id and answer as properties
    socket.emit('answer', current );
    // reset current question
    current = {};
  });

});

/*
var frame = 1;
  
function pulseAnimation(){
   
  var top = 269 * frame;
     
  $('#pulseAnimation').css('backgroundPosition', '0px ' + '-'+ top + 'px');
  
  frame = (frame + 1) % 19;
} 
*/