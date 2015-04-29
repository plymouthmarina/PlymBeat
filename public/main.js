var current = {};

$(document).ready(function(e) {
/****************************************************
********      Websocket.io
*****************************************************/

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(init);
} /* else show error message on page*/

// top right 50.442804, -4.016016
// bottom left 50.355704, -4.221323
var socket = io();


var plymBounds = {
  maxLat: 50.442804,
  minLat: 50.355704,
  maxLng: -4.016016,
  minLng: -4.221323
};

function init (pos) {
  if (pos.coords.latitude > plymBounds.minLat && pos.coords.longitude < plymBounds.maxLat && pos.coords.longitude > plymBounds.minLng && pos.coords.longitude < plymBounds.maxLng) {
    socket.emit('initialise', {});
  } else {
    console.log("according to the data you are not located in plymouth at the momemt");
  }
}

socket.on('initialise', function (data) {
  console.log(data);

  $('.loader').hide();
  $('#desc').show();

  if (data.length === 0) {
    // show question input
    $('#questionForm').show();

  } else if (data.length == 1 && data[0].answers.length === 0) {
    // set current question
    current = data[0];
    $('#currentQuestion').val(current.question).show();
    $('#answerForm').show();

  } else {

    if(data[0].answers.length > 0) {
      // append to history
      addToHistory(data[0]);
      // show question form
      $('#questionForm').show();
    } else {
      // set as current question
      current = data[0];
      $('#currentQuestion').text(current.question).show();
      $('#answerForm').show();
    }

    // append remaining to history
    for (var i = 1; i < data.length; i++) {
      addToHistory(data[i]);
    }
  }

  // [0] == current
  // rest goes into history


});

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
  $('#questionInput').val('');
  $('#questionForm').show();
  // -> hide answer input field
  $('#answerForm').hide();
  // reset input field to blank
  $('#currentAnswer').val('');

  // append question + answer to history (w/ unique id)
  addToHistory(data);
});

socket.on('question', function (data) {
  // stuff that happens after someone gives a new question
  console.log("new question", data);

  current.question = data.question;
  current.id = data.id;
  current.timestamp = data.timestamp;

  // -> show new question
  $('#currentQuestion').val(current.question).show();
  // -> hide question input
  $('#questionForm').hide();
  // reset input field to blank
  $('#questionInput').val('');
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
    $('#currentQuestion').text(question);
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

function addToHistory (topic) {
  $('#history').prepend(
    '<div id="' + topic.id + '">' + 
      '<div class="historyQuestion" cl>' + 
        '<p class = "capital">Q</p>' + 
        '<p>' + topic.question + '</p>' + 
      '</div>' +
      '<div class="historyAnswer">' +
        '<p  class = "capital">A</p>' +
        '<p>' + topic.answers[0].answer + '</p>' +
      '</div>' +
    '</div>');
}

/*
var frame = 1;
  
function pulseAnimation(){
   
  var top = 269 * frame;
     
  $('#pulseAnimation').css('backgroundPosition', '0px ' + '-'+ top + 'px');
  
  frame = (frame + 1) % 19;
} 
*/