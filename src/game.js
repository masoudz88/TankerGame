// TODO: move the ball

// call the canvas from index.html

let gameData;

let TANK_BARREL_GAP_Y, TANK_BARREL_GAP_X,TANK_MOVE_INTERVALS,TANK_AIM_MOVE_INTERVALS,UP_MOVEMENT_ON_EACH_CLICK,
IMAGE_WIDTH, IMAGE_HEIGHT, TANK_BARREL_ENDPOINT_GAP_X,TANK_BARREL_ENDPOINT_GAP_Y,TANK_BALL_GAP_X_1,TANK_BALL_GAP_X_2,
TANK_BALL_GAP_Y,TANK_BALL_CLEAR_X_1,TANK_BALL_CLEAR_X_2, TANK_BALL_CLEAR_Y, X_AXIS_SPEED, Y_AXIS_SPEED, GRAVITY;


class Tank {
    constructor(x, y, direction) {
        this.direction = direction;
        this.x = x;
        this.y = y;                
        this.aim_start_point_x = this.x + gameData.TANK_BARREL_GAP_X; // TODO: bad naming (uncle bob)
        this.aim_start_point_y = this.y + gameData.TANK_BARREL_GAP_Y; // TODO: magic variable -> constants
        this.ball_start_point = this.aim_start_point_x;
        this.ball_end_point = this.aim_start_point_y;
        this.radius = 10;
        this.count = 0;
        this.barrel_limit = 0;
        this.c = document.getElementById("myCanvas");
        this.c.width = window.innerWidth;
        this.c.height = window.innerHeight;
        this.ctx = this.c.getContext("2d");
        this.img = document.getElementById("tank");        
        console.log(this);
        
    }
    

    drawTank() {
        console.log("drawing tank");
        this.ctx.drawImage(this.img, this.x, this.y, gameData.IMAGE_WIDTH, gameData.IMAGE_HEIGHT);
    }

    //sets the aim on right side of the tank
    tankAim() {
        this.ctx.beginPath();
        this.ctx.moveTo(this.aim_start_point_x, this.aim_start_point_y);
        if(this.direction=="left"){
            this.ctx.lineTo(this.aim_start_point_x + gameData.TANK_BARREL_ENDPOINT_GAP_X, this.aim_start_point_y - gameData.TANK_BARREL_ENDPOINT_GAP_Y);
        }
        else if(this.direction=="right"){
            this.ctx.lineTo(this.aim_start_point_x - 110, this.aim_start_point_y - 10);
        }
        this.ctx.lineWidth = 10;
        this.ctx.stroke();

    }

    //sets the aim on left side of the tank
    /*tankAim2() {
        this.ctx.beginPath();
        this.ctx.moveTo(this.aim_start_point_x, this.aim_start_point_y);
        this.ctx.lineTo(this.aim_start_point_x - 110, this.aim_start_point_y - 10);
        this.ctx.lineWidth = 10;
        this.ctx.stroke();

    }*/
    //making the ball to move
    drawBall() {
        this.ctx.beginPath();
        if(this.direction=="left"){
            this.ctx.arc(this.ball_start_point + gameData.TANK_BALL_GAP_X_1, this.ball_end_point - gameData.TANK_BALL_GAP_Y, this.radius, 0, Math.PI * 2, true);
        }
        else if(this.direction=="right"){
            this.ctx.arc(this.ball_start_point - gameData.TANK_BALL_GAP_X_2, this.ball_end_point - gameData.TANK_BALL_GAP_Y, this.radius, 0, Math.PI * 2, true);
        }
        
        this.ctx.closePath();
        this.ctx.fill();
        console.log("this is a ball")
    }
    /*drawBall2() {
        this.ctx.beginPath();
        this.ctx.arc(this.ball_start_point - gameData.TANK_BALL_GAP_X_2, this.ball_end_point - gameData.TANK_BALL_GAP_Y, this.radius, 0, Math.PI * 2, true);
        this.ctx.closePath();
        this.ctx.fill();
        console.log(gameData.TANK_BALL_GAP_X_2)
    }*/

    // TODO: function name is confusing
    moveBulletForward() {
        this.myVar= setInterval(() => { this.shootForward() }, 1000 / 60);         
         console.log("here ")
    }
    moveBulletBackward() {
        this.myVar= setInterval(() => { this.shootBackward() }, 1000 / 60);        
         console.log("here ")
    }

    stopBullet(){
        clearInterval(this.myVar);
        
    }

    // TODO: function names: verb
    shootForward() {
        this.ctx.clearRect(this.ball_start_point + gameData.TANK_BALL_CLEAR_X_1, this.ball_end_point - gameData.TANK_BALL_CLEAR_Y, 100, 100);
        gameData.Y_AXIS_SPEED -= gameData.GRAVITY;
        this.ball_end_point -= gameData.Y_AXIS_SPEED * 8;
        this.ball_start_point += gameData.X_AXIS_SPEED * 8;

        if (this.ball_end_point < this.c.height / 2) { // if ball hits the height of canvas

            gameData.Y_AXIS_SPEED *= -0.01; // then reverse and reduce its vertical speed
        }
        if (this.ball_start_point > 1500 || this.ball_end_point > this.y) { // if ball goes beyond canvas
            return
        }
        this.drawBall();        
    };

    // TODO: function names: verb
    shootBackward() {

        this.ctx.clearRect(this.ball_start_point - gameData.TANK_BALL_CLEAR_X_2, this.ball_end_point - gameData.TANK_BALL_CLEAR_Y, 100, 100);
        gameData.Y_AXIS_SPEED -= gameData.GRAVITY;
        this.ball_end_point -= gameData.Y_AXIS_SPEED * 8;
        this.ball_start_point -= gameData.X_AXIS_SPEED * 8;

        if (this.ball_end_point < this.c.height / 2) { // if ball hits the height of canvas

            gameData.Y_AXIS_SPEED *= -0.01; // then reverse and reduce its vertical speed
        }
        if (this.ball_start_point < 100 || this.ball_end_point > this.y) { // if ball goes beyond canvas
            return
        }

        this.drawBall();        
    };

      
    // TODO: clean up the if/elses to make it more concise
    arrowKeyControl() {
        document.addEventListener("keydown", Event => {
            this.ctx.clearRect(0, 0, innerWidth, innerHeight)
            if (Event.key === "ArrowRight") {
                this.x += gameData.TANK_MOVE_INTERVALS;
                this.aim_start_point_x += gameData.TANK_AIM_MOVE_INTERVALS;
                this.drawTank();
                this.tankAim()
            } //right arrow
            else if (Event.key === "ArrowLeft") {
                this.x -= gameData.TANK_MOVE_INTERVALS;
                this.aim_start_point_x -= gameData.TANK_AIM_MOVE_INTERVALS;
                this.drawTank();
                this.tankAim()
            }
            
            //left arrow 
            else if (Event.key === "ArrowUp") {
                let upLimit = true
                if (this.barrel_limit > -30 && upLimit) {
                    this.ctx.drawImage(this.img, this.x, this.y, gameData.IMAGE_WIDTH, gameData.IMAGE_HEIGHT);
                    this.barrel_limit -= gameData.UP_MOVEMENT_ON_EACH_CLICK;
                    //move the tank aim up  as the variable t changes
                    this.ctx.beginPath();
                    this.ctx.moveTo(this.aim_start_point_x, this.aim_start_point_y);
                    this.ctx.lineTo(this.aim_start_point_x + 60 + this.barrel_limit, this.aim_start_point_y - 10 + this.barrel_limit);
                    this.ctx.lineWidth = 10;
                    this.ctx.stroke();
                }
                else {
                    this.ctx.drawImage(this.img, this.x, this.y, gameData.IMAGE_WIDTH, gameData.IMAGE_HEIGHT);
                    this.ctx.beginPath();
                    this.ctx.moveTo(this.aim_start_point_x, this.aim_start_point_y);
                    this.ctx.lineTo(this.aim_start_point_x + 60 + this.barrel_limit, this.aim_start_point_y - 10 + this.barrel_limit);
                    this.ctx.lineWidth = 10;
                    this.ctx.stroke();
                    
                }

            } //arrow up
            else if (Event.key === "ArrowDown") {
                console.log("down");
                let downLimit = true
                if (this.barrel_limit < 10 && downLimit) {
                    this.drawTank();
                    this.barrel_limit += gameData.UP_MOVEMENT_ON_EACH_CLICK;
                    this.ctx.beginPath();
                    this.ctx.moveTo(this.aim_start_point_x, this.aim_start_point_y);
                    this.ctx.lineTo(this.aim_start_point_x + 60 + this.barrel_limit, this.aim_start_point_y - 10 + this.barrel_limit);
                    this.ctx.lineWidth = 10;
                    this.ctx.stroke();
                }
                else {
                    this.drawTank();
                    this.ctx.beginPath();
                    this.ctx.moveTo(this.aim_start_point_x, this.aim_start_point_y);
                    this.ctx.lineTo(this.aim_start_point_x + 60 + this.barrel_limit, this.aim_start_point_y - 10 + this.barrel_limit);
                    this.ctx.lineWidth = 10;
                    this.ctx.stroke();
                    
                }
            }
            /*else {
                console.log("invalid key");
                //this.ctx.drawImage(this.img, this.x, this.y, gameData.IMAGE_WIDTH, gameData.IMAGE_HEIGHT);
                this.drawTank();
                this.tankAim1();
            }*/
        });
    }
        buttomKeyControl1() {
            document.addEventListener("keydown", Event => {
            //this.ctx.clearRect(0, 0, innerWidth, innerHeight)
            //left tank shooting when pressing s 
            if (Event.key === "s" || Event.key === "S") {
                console.log("s");
                this.stopBullet()// clear the interval
                this.ball_start_point = this.aim_start_point_x;
                this.ball_end_point = this.aim_start_point_y;
                gameData.X_AXIS_SPEED = 2;
                gameData.Y_AXIS_SPEED = 2;
                this.count += 1;
                this.drawTank();
                this.tankAim();
                this.drawBall();
                this.moveBulletForward();  
            }            
        });
    }
            //right tank shooting when pressing d
        buttomKeyControl2() {
            document.addEventListener("keydown", Event => {
            //this.ctx.clearRect(0, 0, innerWidth, innerHeight) 
            if (Event.key === "d" || Event.key === "D") {
                console.log("d");
                this.stopBullet()// clear the interval
                this.ball_start_point = this.aim_start_point_x;
                this.ball_end_point = this.aim_start_point_y;
                gameData.X_AXIS_SPEED = 2;
                gameData.Y_AXIS_SPEED = 2;
                this.count += 1;
                this.drawTank();
                this.tankAim();
                this.drawBall();
                this.moveBulletBackward();  
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
    oReq.open("GET", "data.json");
    oReq.send();   
}

function startGame(){
    const tank1 = new Tank(250, 400, "left")
    const tank2 = new Tank(700, 400, "right")     
    tank1.tankAim()
    tank1.drawTank()
    tank2.tankAim()
    tank2.drawTank()    
    tank1.arrowKeyControl()  
    tank2.arrowKeyControl()  
    tank1.buttomKeyControl1()
    tank2.buttomKeyControl2() 
}

let turn = 0;
getData();




























