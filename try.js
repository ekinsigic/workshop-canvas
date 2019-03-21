var canvas = document.getElementById('canvas'),
    myPath = [],
    context = canvas.getContext('2d'),
    generalSpeed = 50,
    isOnMove = true;
var canvasOffset = $(canvas).offset();

var x = 350,
    y = x * 2,
    defaultMovingSpeed = 0.5,
    lineOpacity = 0.02,
    thickness = 1,
    sensitivity = 2,
    mouseX = x,
    mouseY = y,
    movingSpeed = defaultMovingSpeed;

context.moveTo(350, 700);

var direction = 'there';

var drawing = setInterval(function () {
    myPath.push([mouseX - canvasOffset.left , mouseY - canvasOffset.top]);
    myStroke();
    if (direction === 'there') {
        y--;
    } else {
        y++;
    }
    if(y == 0) {
        direction = 'andback';
    } else if (y == 700) {
        direction = 'there';
    }
},50);

$(canvas).bind('mousemove',function(e){
    mouseX = e.pageX;
    mouseY = e.pageY;
    myPath.push([mouseX - canvasOffset.left , mouseY - canvasOffset.top]);
    myStroke();
});

$(canvas).bind('touchmove',function(e){
    console.log(e);
    mouseX = e.originalEvent.touches[0].clientX;
    mouseY = e.originalEvent.touches[0].clientY;
    myPath.push([mouseX - canvasOffset.left , mouseY - canvasOffset.top]);
    myStroke();
});



var myStroke = function() {
    context.beginPath();
    context.clearRect(0,0,canvas.width,canvas.height);
    context.fillStyle = 'black';
    context.fillRect(0,0,canvas.width,canvas.height);
    myPath.push([x,y]);
    context.strokeStyle = 'rgba(255,255,255,'+ 1 +')';
    context.lineWidth = 0.03;
    for (var i = 0; i < myPath.length; i++) {
        var thisX = myPath[i][0];
        var thisY = myPath[i][1];
        context.lineTo(thisX, thisY);
    }
    context.stroke();
    context.closePath();
};
