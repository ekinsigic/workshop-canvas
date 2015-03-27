var canvas = document.getElementById('canvas'),
    myPath = [],
    context = canvas.getContext('2d'),
    generalSpeed = 1,
    radius = 50,
    isOnMove = true;
var canvasOffset = $(canvas).offset();

var x = 350,
    y = x * 2,
    defaultMovingSpeed = 1,
    lineOpacity = 0.08,
    thickness = 1,
    sensitivity = 0.2,
    movingSpeed = defaultMovingSpeed;

var circleCoordinator = 0;
$(canvas).mousedown(function(e){
    var mouseX = e.pageX - canvasOffset.left;
    var mouseY = e.pageY - canvasOffset.top;
    //x = mouseX;
    //y = mouseY;
    var mouseDownFirst = true;

    if (mouseDownFirst) {
        myPath.push([mouseX , mouseY]);
    }
    var circleInterval = setInterval(function () {


        circleCoordinator = Math.random() * radius * radius;

        var circleCoordinateX = Math.sqrt(circleCoordinator);
        var circleCoordinateY = Math.sqrt((radius * radius) - circleCoordinator);

        var xRandomer = Math.random();
        if(xRandomer > 0.50){
            circleCoordinateX = -circleCoordinateX;
        }
        var yRandomer = Math.random();
        if(yRandomer > 0.50){
            circleCoordinateY = -circleCoordinateY;
        }

        var circleX = mouseX - circleCoordinateX;
        var circleY = mouseY - circleCoordinateY;

        myPath.push([circleX, circleY]);

        myStroke();
    },generalSpeed);
    $(canvas).bind('mousemove',function(e){
        //myPath.push([mouseX , mouseY]);

        var mouseX = e.pageX - canvasOffset.left;
        var mouseY = e.pageY - canvasOffset.top;

        circleCoordinator = Math.random() * radius * radius;

        var circleCoordinateX = Math.sqrt(circleCoordinator);
        var circleCoordinateY = Math.sqrt((radius * radius) - circleCoordinator);

        var xRandomer = Math.random();
        if(xRandomer > 0.50){
            circleCoordinateX = -circleCoordinateX;
        }
        var yRandomer = Math.random();
        if(yRandomer > 0.50){
            circleCoordinateY = -circleCoordinateY;
        }

        var circleX = mouseX - circleCoordinateX;
        var circleY = mouseY - circleCoordinateY;

        myPath.push([circleX, circleY]);

        myStroke();
    });
    $(canvas).mouseup(function(e){
        $(canvas).unbind('mousemove');
        clearInterval(circleInterval);
    });
});

$(window).keydown(function(e){


    if(e.which == 37) {
        x = x - movingSpeed;
        movingSpeed = movingSpeed + sensitivity;
        myStroke();
        $(window).keyup(function(){
            movingSpeed = defaultMovingSpeed;
        });
    }
    else if (e.which == 39) {
        x = x + movingSpeed;
        movingSpeed = movingSpeed + sensitivity;
        myStroke();
        $(window).keyup(function(){
            movingSpeed = defaultMovingSpeed;
        });
    }
    else if (e.which == 40) {
        y = y + movingSpeed;
        movingSpeed = movingSpeed + sensitivity;
        myStroke();
        $(window).keyup(function(){
            movingSpeed = defaultMovingSpeed;
        });
    }
    else if (e.which == 38) {
        y = y - movingSpeed;
        movingSpeed = movingSpeed + sensitivity;
        myStroke();
        $(window).keyup(function(){
            movingSpeed = defaultMovingSpeed;
        });
    }


    else if (e.which == 32) {
        stopMove();
    }
});

var stopMove = function(){
    if(isOnMove) {
        clearInterval(drawing);
        isOnMove = false;
        console.log('stopped!');
    }
    else {
        drawing = setInterval(function () {
            myStroke();
            y--;
            if(y == 0) {
                stopMove();
            }
        },generalSpeed);
        isOnMove = true;
    }
};

var qwert = 0;
var myStroke = function() {
    context.beginPath();
    context.clearRect(0,0,canvas.width,canvas.height);
    console.log('begin path');
    //myPath.push([x,y]);
    console.log('push to path');
    for (var i = 0; i < myPath.length; i++) {
        var thisX = myPath[i][0];
        var thisY = myPath[i][1];
        if (i != 0){
            var thatX = myPath[i-1][0];
            var thatY = myPath[i-1][1];
            context.moveTo(thatX, thatY);
        }
        context.lineTo(thisX, thisY);
    }
    console.log('for loop');
    context.strokeStyle = 'rgba(0,0,0,'+ lineOpacity +')';
    context.lineWidth = thickness;
    context.stroke();
    console.log('stroke');
    context.closePath();
    console.log('closePath');
    console.log('qwert ' + qwert + ' finished');
    qwert++;
    console.log('---------------------------------------------------------------');
    console.log('---------------------------------------------------------------');
    console.log('---------------------------------------------------------------');
};




//var char = $('#char');
//
//move(char);
//function move($elem) {
//    if( $elem.css('top') == 'auto') {
//        $elem.css('top','0');
//    }
//    setInterval(function(){
//        $elem.css('top', parseInt(char.css('top')) + 20 + 'px');
//        console.log($elem.css('top'));
//    },1000)
//};