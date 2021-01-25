// TODO: move the ball

// call the canvas from index.html

let gameData;

let TANK_BARREL_GAP_Y, TANK_BARREL_GAP_X, TANK_MOVE_INTERVALS, TANK_AIM_MOVE_INTERVALS, UP_MOVEMENT_ON_EACH_CLICK,
    IMAGE_WIDTH, IMAGE_HEIGHT, TANK_BARREL_ENDPOINT_GAP_X, TANK_BARREL_ENDPOINT_GAP_Y, TANK_BALL_GAP_X_1, TANK_BALL_GAP_X_2,
    TANK_BALL_GAP_Y, TANK_BALL_CLEAR_X_1, TANK_BALL_CLEAR_X_2, TANK_BALL_CLEAR_Y, X_AXIS_SPEED, Y_AXIS_SPEED, GRAVITY;

let tankCounter = 0;
const c = document.getElementById("myCanvas");
c.width = window.innerWidth;
c.height = window.innerHeight;
const ctx = c.getContext("2d");
const img = document.getElementById("tank");

class Tank {
    constructor(x, y, direction) {
        this.direction = direction;
        this.tankTurn= tankCounter;
        tankCounter++;
        this.x = x;
        this.y = y;
        this.aim_start_point_x = this.x + gameData.TANK_BARREL_GAP_X; // TODO: bad naming (uncle bob)
        this.aim_start_point_y = this.y + gameData.TANK_BARREL_GAP_Y; // TODO: magic variable -> constants
        this.ball_start_point = this.aim_start_point_x;
        this.ball_end_point = this.aim_start_point_y;
        this.radius = 10;
        this.count = 0;
        this.barrel_limit = 0;     

    }

    drawImage(){
        ctx.drawImage(img, this.x, this.y, gameData.IMAGE_WIDTH, gameData.IMAGE_HEIGHT);
    }


    drawTank() {
        console.log("drawing tank");
        this.drawImage();
        ctx.beginPath();
        ctx.moveTo(this.aim_start_point_x, this.aim_start_point_y);
        if (this.direction == "left") {
            ctx.lineTo(this.aim_start_point_x + gameData.TANK_BARREL_ENDPOINT_GAP_X, this.aim_start_point_y - gameData.TANK_BARREL_ENDPOINT_GAP_Y);
        }
        else if (this.direction == "right") {
            ctx.lineTo(this.aim_start_point_x - 110, this.aim_start_point_y - 10);
        }
        ctx.lineWidth = 10;
        ctx.stroke();
    }


    //making the ball to move
    drawBall() {
        ctx.beginPath();
        if (this.direction == "left") {
            ctx.arc(this.ball_start_point + gameData.TANK_BALL_GAP_X_1, this.ball_end_point - gameData.TANK_BALL_GAP_Y, this.radius, 0, Math.PI * 2, true);
        }
        else if (this.direction == "right") {
            ctx.arc(this.ball_start_point - gameData.TANK_BALL_GAP_X_2, this.ball_end_point - gameData.TANK_BALL_GAP_Y, this.radius, 0, Math.PI * 2, true);
        }

        ctx.closePath();
        ctx.fill();
        console.log("this is a ball")
    }


    // TODO: function name is confusing
    moveBullet() {
        if (this.direction == "left") {
            this.myVar = setInterval(() => { this.shootForward() }, 1000 / 60);
        }
        else if (this.direction == "right") {
            this.myVar = setInterval(() => { this.shootForward() }, 1000 / 60);
        }        
    
    }

    stopBullet() {
        clearInterval(this.myVar);
    }

    // TODO: function names: verb
    shootForward() {
        if (this.direction == "left"){
            rerender();
            //ctx.clearRect(this.ball_start_point + gameData.TANK_BALL_CLEAR_X_1, this.ball_end_point - gameData.TANK_BALL_CLEAR_Y, 100, 100);
        }
        else if(this.direction == "right"){
            rerender();
            //ctx.clearRect(this.ball_start_point - gameData.TANK_BALL_CLEAR_X_2, this.ball_end_point - gameData.TANK_BALL_CLEAR_Y, 100, 100);
        }
        gameData.Y_AXIS_SPEED -= gameData.GRAVITY;
        this.ball_end_point -= gameData.Y_AXIS_SPEED * 8;
        if (this.direction == "left"){
            this.ball_start_point += gameData.X_AXIS_SPEED * 8;
            if (this.ball_start_point > 1500 || this.ball_end_point > this.y) { // if ball goes beyond canvas
                return
            }
        }
        else if(this.direction == "right"){
            this.ball_start_point -= gameData.X_AXIS_SPEED * 8;
            if (this.ball_start_point < 100 || this.ball_end_point > this.y) { // if ball goes beyond canvas
                return
            }
        }

        if (this.ball_end_point < c.height / 2) { // if ball hits the height of canvas

            gameData.Y_AXIS_SPEED *= -0.01; // then reverse and reduce its vertical speed
        }
        
        this.drawBall();
        
    }    
    


    // TODO: clean up the if/elses to make it more concise
    keyControl() {
        document.addEventListener("keydown", Event => {
            console.log(turn, this.tankTurn)
            if (this.direction == "left") {                
                rerender();
            }
            else if (this.direction == "right") {                
                rerender();
            }

            if (Event.key === "ArrowRight") {
                this.x += gameData.TANK_MOVE_INTERVALS;
                this.aim_start_point_x += gameData.TANK_AIM_MOVE_INTERVALS;
                //this.drawTank();       
                
            } //right arrow
            else if (Event.key === "ArrowLeft") {
                this.x -= gameData.TANK_MOVE_INTERVALS;
                this.aim_start_point_x -= gameData.TANK_AIM_MOVE_INTERVALS;
                //this.drawTank();              
                
            }

            //left arrow 
            else if (Event.key === "ArrowUp") {
                
                if (this.barrel_limit > -30 ) {
                    this.drawImage();
                    this.barrel_limit -= gameData.UP_MOVEMENT_ON_EACH_CLICK;
                    //move the tank aim up  as the variable t changes
                    ctx.beginPath();
                    ctx.moveTo(this.aim_start_point_x, this.aim_start_point_y);
                    ctx.lineTo(this.aim_start_point_x + 60 + this.barrel_limit, this.aim_start_point_y - 10 + this.barrel_limit);
                    ctx.lineWidth = 10;
                    ctx.stroke();
                }
                else {
                    this.drawImage();
                    ctx.beginPath();
                    ctx.moveTo(this.aim_start_point_x, this.aim_start_point_y);
                    ctx.lineTo(this.aim_start_point_x + 60 + this.barrel_limit, this.aim_start_point_y - 10 + this.barrel_limit);
                    ctx.lineWidth = 10;
                    ctx.stroke();

                }

            } //arrow up
            else if (Event.key === "ArrowDown") {
                console.log("down");                
                if (this.barrel_limit < 10) {
                    this.drawTank();
                    this.barrel_limit += gameData.UP_MOVEMENT_ON_EACH_CLICK;
                    ctx.beginPath();
                    ctx.moveTo(this.aim_start_point_x, this.aim_start_point_y);
                    ctx.lineTo(this.aim_start_point_x + 60 + this.barrel_limit, this.aim_start_point_y - 10 + this.barrel_limit);
                    ctx.lineWidth = 10;
                    ctx.stroke();
                }
                else {
                    this.drawTank();
                    ctx.beginPath();
                    ctx.moveTo(this.aim_start_point_x, this.aim_start_point_y);
                    ctx.lineTo(this.aim_start_point_x + 60 + this.barrel_limit, this.aim_start_point_y - 10 + this.barrel_limit);
                    ctx.lineWidth = 10;
                    ctx.stroke();

                }
            } else if (Event.key === "s" || Event.key === "S") {
                console.log("s");
                if(turn == this.tankTurn) {
                    this.stopBullet()// clear the interval
                    this.ball_start_point = this.aim_start_point_x;
                    this.ball_end_point = this.aim_start_point_y;
                    gameData.X_AXIS_SPEED = 2;
                    gameData.Y_AXIS_SPEED = 2;                
                    this.drawTank();                   
                    this.drawBall();
                    this.moveBullet();                      
                } 
            } 

        });
    }
}


// setup the game configuration and start the whole game
function getData() {
    const oReq = new XMLHttpRequest();
    oReq.addEventListener('load', function () {
        let data = JSON.parse(oReq.response)
        gameData = data;
        startGame();
    })
    oReq.open("GET", "./data.json");
    oReq.send();
}

let turn = 0;
function rerender() {
    ctx.clearRect(0, 0, c.width, c.height);
    tank1.drawTank()
    tank2.drawTank();
    console.log("this is rerender");
}
let tank1, tank2;
function startGame() {
    tank1 = new Tank(250, 400, "left")
    tank2 = new Tank(700, 400, "right")
    tank1.drawTank()
    tank2.drawTank()
    rerender();
    if (turn==0){
        tank1.keyControl()
    }else{
        tank2.keyControl()
    }    
}
getData();