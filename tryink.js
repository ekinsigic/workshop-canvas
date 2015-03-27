var canvas = document.getElementById('canvas'),
    myPath = [],
    context = canvas.getContext('2d'),
    generalSpeed = 1,
    isOnMove = true;
var canvasOffset = $(canvas).offset();

var x = 350,
    y = x * 2,
    defaultMovingSpeed = 1,
    lineOpacity = 0.1,
    thickness = 0,
    radius = 0,
    defaultRadius = 50,
    sensitivity = 0.2,
    movingSpeed = defaultMovingSpeed;

var circleCoordinator = 0;
$(canvas).mousedown(function(e){
    var mouseX = e.pageX - canvasOffset.left;
    var mouseY = e.pageY - canvasOffset.top;
    var grow = true;

    radius = 1;
    var inkDrop = setInterval(function(){
        myPath.push([mouseX,mouseY, radius]);
        context.beginPath();
        context.clearRect(0,0,canvas.width,canvas.height);
        for (var i = 0; i < myPath.length; i++) {
            var thisX = myPath[i][0];
            var thisY = myPath[i][1];
            var thisR = myPath[i][2];
            context.moveTo(thisX, thisY);
            context.arc(thisX, thisY, thisR, 0, 2 * Math.PI, false);
        }
        context.strokeStyle = 'rgba(0,0,0,'+ lineOpacity +')';
        context.lineWidth = thickness;
        context.fillStyle = 'rgba(255, 199, 50, 0.2)';
        context.fill();
        context.stroke();
        context.closePath();
        if (radius == 150) {
            grow = false;
        } else if (radius == 0) {
            grow = true;
        }
        if (grow) {
            radius++;
        } else {
            radius--;
        }
        console.log(radius);
    },generalSpeed);
    //$(this).mousemove(function(){
    //    mouseX = e.pageX - canvasOffset.left;
    //    mouseY = e.pageY - canvasOffset.top;
    //    myPath.push([mouseX,mouseY, radius]);
    //    context.beginPath();
    //    context.clearRect(0,0,canvas.width,canvas.height);
    //    for (var i = 0; i < myPath.length; i++) {
    //        var thisX = myPath[i][0];
    //        var thisY = myPath[i][1];
    //        var thisR = myPath[i][2];
    //        context.arc(thisX, thisY, thisR, 0, 2 * Math.PI, false);
    //    }
    //    context.strokeStyle = 'rgba(0,0,0,'+ lineOpacity +')';
    //    context.lineWidth = thickness;
    //    context.stroke();
    //    context.closePath();
    //    if (radius == 50) {
    //        grow = false;
    //    } else if (radius == 0) {
    //        grow = true;
    //    }
    //    if (grow) {
    //        radius++;
    //    } else {
    //        radius--;
    //    }
    //});
    $(this).mouseup(function () {
        clearInterval(inkDrop);
    });
});

//var myStroke = function(type) {
//    if (type == null) {
//        type = 'line';
//    }
//    context.beginPath();
//    context.clearRect(0,0,canvas.width,canvas.height);
//    //myPath.push([x,y]);
//    for (var i = 0; i < myPath.length; i++) {
//        var thisX = myPath[i][0];
//        var thisY = myPath[i][1];
//        if (type == 'line') {
//            context.lineTo(thisX, thisY);
//        }
//        else if (type == 'circle') {
//            context.arc(thisX, thisY, radius, 0, 2 * Math.PI, false);
//        }
//    }
//    context.strokeStyle = 'rgba(0,0,0,'+ lineOpacity +')';
//    context.lineWidth = thickness;
//    context.stroke();
//    context.closePath();
//};




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