var pulseInterval;

$(document).ready(function(e) {
  
  pulseInterval = setInterval(pulseAnimation,100);
  
  $("#submitAnswer").click(function(){
	  $("#history").append("<div><p>Appended Question</p></div>");
  });
   
});

var frame = 1;
  
function pulseAnimation(){
   
  var top = 269 * frame;
     
  $('#pulseAnimation').css('backgroundPosition', '0px ' + '-'+ top + 'px');
  
  frame = ++frame % 19;

  if (frame < 19){
     frame++;
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
} */