var canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d'),
//game preferences
    movingX = 150,
    movingY = 350,

    ballSpeed = 5,
    dx = ballSpeed,
    dy = ballSpeed,

    maxSpeed = ballSpeed * 1.5,

    padWidth = 100,
    padHeight = 15,

    ballSize = 10,


    //game settings
    gameFPS = 60,
    padX = canvas.width/2 - padWidth/2,
    padY = canvas.height - padHeight,
    padMargin = 5,
    angler = dx/(padWidth/2),
    wallMargin = 7,
    pointerPosX = 0,
    touchDown = true;



$(canvas).mousemove(function(e){
    pointerPosX = (e.pageX - $(canvas).offset().left) - (canvas.width/2);
});

gameSession = setInterval(draw, 1000/gameFPS);






function draw() {
    context.clearRect(0,0,canvas.width,canvas.height);
    create({
        type: 'rectangle',
        position: {
            x: padX + pointerPosX,
            y: padY
        },
        size: {
            width: padWidth,
            height: padHeight
        },
        background : 'red'
    });
    create({
        type : 'circle',
        moving : true,
        position : {
            x : movingX,
            y : movingY
        },
        size : {
            radius : ballSize
        }
    });



    if (movingX + dx > canvas.width - ballSize + wallMargin || movingX + dx < ballSize - wallMargin) {
        dx = -dx;
    }

    touchDown = !!(movingX + dx < padX + pointerPosX || movingX + dx > padX + pointerPosX + padWidth);

    if (touchDown) {
        if (movingY + dy > canvas.height - ballSize + wallMargin) {
            $('body').css('background', 'red');
            clearInterval(gameSession);
        }

    } else {
        if (movingY + dy > canvas.height - ballSize + wallMargin - padHeight - padMargin || movingY + dy < ballSize - wallMargin ) {
            if (movingY + dy > canvas.height - ballSize + wallMargin - padHeight - padMargin) {
                var trajectory = (movingX + dx) - (padX + pointerPosX) - (padWidth/2);
                var lean = {
                    angle : 0,
                    direction : 'rightUp'
                };
                lean.angle =  (trajectory)*angler*2;
                console.log(lean.angle);
                dx = dx + lean.angle;
                if (dx > maxSpeed || -dx > maxSpeed) {
                    if (dx > 0) {
                        dx = maxSpeed;
                    } else {maxSpeed
                        dx = -maxSpeed;
                    }
                }
            }
            dy = -dy;
        }
    }
    if (movingY + dy > canvas.height - ballSize + wallMargin || movingY + dy < ballSize - wallMargin ) {
        dy = -dy;
    }

    movingX += dx;
    movingY += dy;

    maxSpeed = maxSpeed + 0.001;
    console.clear();
    console.log(maxSpeed);
}


function create(parameters) {
    parameters = $.extend({
        type : 'line',
        background : 'grey',
        thickness : 1,
        color : 'grey',
        position : {
            x: 0,
            y: 0
        },
        size : {
            width : 50,
            height : 50,
            radius : 50
        }
    },parameters);
    context.beginPath();
    if (parameters.type = 'circle') {
        context.arc(parameters.position.x,
                    parameters.position.y,
                    parameters.size.radius,
                    0,
                    Math.PI*2,
                    true);
    }
    if (parameters.type = 'rectangle') {
        context.rect(parameters.position.x,
            parameters.position.y,
            parameters.size.width,
            parameters.size.height);
    }
    context.closePath();
    context.fillStyle = parameters.background;
    context.fill();
}

