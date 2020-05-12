var buttonColors = ['red','blue','green','yellow'];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var val = false;
$(document).keypress(function(){
  if (val == false){
    val = true;
    $('h1').text('Level 0');
    $('.rules').toggleClass('visible');
    nextSequence();
  }
});


function nextSequence(){
  level++;
  $('h1').text('Level '+ level);
  randomNumber = (Math.floor(Math.random()*4));
  randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  showSequence(randomChosenColor);
  playAudio(randomChosenColor);
}

$('.btn').click(function(){
  userChosenColor = $(this).attr('id');
  userClickedPattern.push(userChosenColor);
  playAudio(userChosenColor);
  showSequence(userChosenColor);

  index = userClickedPattern.length - 1;
  checkAnswer(index);
})

function showSequence(color){
    $('#'+color).toggleClass('animate');
    setTimeout(function(){$('#'+color).toggleClass('animate');},150);
}

function playAudio(color){
  var address = 'sounds/' + color + '.mp3';
  var audio = new Audio(address);
  audio.play();
}

function checkAnswer(index){
  if (userClickedPattern[index] == gamePattern[index]){
    console.log(true);
    if (userClickedPattern.length == gamePattern.length){
      console.log('Proceeding to Next Level');
      setTimeout(function(){nextSequence();
      userClickedPattern = [];},1000);
    }
  }
  else{
    console.log(false);
    $('h1').text('Game Over, Press Any Key To restart.');
    playAudio('wrong');
    $('body').toggleClass('game-over');
    setTimeout(function(){$('body').toggleClass('game-over');},100);
    startOver();
  }
}

function startOver(){
  val = false;
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
}
