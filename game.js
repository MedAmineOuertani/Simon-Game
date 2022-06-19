var buttonColours=["red","blue","green","yellow"];
var gamePattern=new Array();
var userClickedPattern=new Array();
var start=true;
var level=0;
$(document).keypress(function(event){
    if(event.key=='a' && start){
        nextSequence();
        $("#level-title").text("level "+level);
        start=false;
    }});
function nextSequence(){
    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    buttonClicked(randomChosenColour);
    playSound(randomChosenColour);
    
}
$(".btn").click(function(){
    var userChosenColour=this.attributes.id.textContent;
    userClickedPattern.push(userChosenColour);
    buttonClicked(userChosenColour);
    playSound(userChosenColour); 
    checkAnswer(userClickedPattern.length-1);
});

function playSound(name){
    var audio=new Audio("sounds/"+name+".mp3");
    audio.play();
}
function buttonClicked(id){
    
    $("#"+id).addClass("pressed");
    setTimeout(function(){
        $("#"+id).removeClass("pressed");
    },100);
}
function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel] == gamePattern[currentLevel]){
            if(userClickedPattern.length == gamePattern.length){
            setTimeout(function(){
                nextSequence();
                level++;
                $("#level-title").text("level "+level);
                userClickedPattern=[];

            },700);
        }
        
    }else{
        var audio=new Audio("sounds/wrong.mp3");
        audio.play();
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },150);
        $("h1").text("Game Over !");
        setTimeout(startOver,2000);
    }
}
function startOver(){
    level=0;
    start=true;
    $("h1").text("Press A Key to Start");
    gamePattern=[];
    userClickedPattern=[];
}