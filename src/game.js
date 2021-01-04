// TODO: move the ball

// call the canvas from index.html


let TANK_BARREL_GAP_Y=70 ;
let TANK_BARREL_GAP_X = 90;
let TANK_MOVE_INTERVALS = 10;
let TANK_AIM_MOVE_INTERVALS = 10;
let UP_MOVEMENT_ON_EACH_CLICK = 5;
let IMAGE_WIDTH = 150;
let IMAGE_HEIGHT = 150;
let TANK_BARREL_ENDPOINT_GAP_ = 65;
let TANK_BALL_GAP_X_1 = 90;
let TANK_BALL_GAP_X_2 = 115;
let TANK_BALL_GAP_Y = 20;
let TANK_BALL_CLEAR_X_1 = 70;
let TANK_BALL_CLEAR_X_2 = 200;
let TANK_BALL_CLEAR_Y = 60;
let highscore;
let X_AXIS_SPEED = 2; // initial horizontal speed
let Y_AXIS_SPEED = 2; // initial vertical speed
let GRAVITY= 0.08;

// setup the game configuration and start the whole game
function getData() {
    const oReq = new XMLHttpRequest();
    oReq.onreadystatechange = function () {
        if (oReq.readyState == XMLHttpRequest.DONE) {
            data = JSON.parse(oReq.response)            
            highscore= data.highscore;
            TANK_BARREL_GAP_Y= data.TANK_BARREL_GAP_Y;
            console.log("highscore loaded", highscore);                                   
        }
    }
    oReq.open("GET", "data.json");

    oReq.send();   
}




class Tank {
    constructor(x, y) {        
        this.x = x;
        this.y = y;                
        this.aim_start_point_x = this.x + TANK_BARREL_GAP_X; // TODO: bad naming (uncle bob)
        this.aim_start_point_y = this.y + TANK_BARREL_GAP_Y; // TODO: magic variable -> constants
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
        this.myVar;

    }
    

    drawTank() {
        console.log("drawing tank");
        this.ctx.drawImage(this.img, this.x, this.y, IMAGE_WIDTH, IMAGE_HEIGHT);
    }

    getCanvas(){
        return this.ctx;
    }
    //sets the aim on right side of the tank
    tankAim1() {
        this.ctx.beginPath();
        this.ctx.moveTo(this.aim_start_point_x, this.aim_start_point_y);
        this.ctx.lineTo(this.aim_start_point_x + 65, this.aim_start_point_y - 10);
        this.ctx.lineWidth = 10;
        this.ctx.stroke();

    }

    //sets the aim on left side of the tank
    tankAim2() {
        this.ctx.beginPath();
        this.ctx.moveTo(this.aim_start_point_x, this.aim_start_point_y);
        this.ctx.lineTo(this.aim_start_point_x - 110, this.aim_start_point_y - 10);
        this.ctx.lineWidth = 10;
        this.ctx.stroke();

    }
    //making the ball to move
    drawBall1() {
        this.ctx.beginPath();
        this.ctx.arc(this.ball_start_point + TANK_BALL_GAP_X_1, this.ball_end_point - TANK_BALL_GAP_Y, this.radius, 0, Math.PI * 2, true);
        this.ctx.closePath();
        this.ctx.fill();
        console.log("this is a ball")
    };
    drawBall2() {
        this.ctx.beginPath();
        this.ctx.arc(this.ball_start_point - TANK_BALL_GAP_X_2, this.ball_end_point - TANK_BALL_GAP_Y, this.radius, 0, Math.PI * 2, true);
        this.ctx.closePath();
        this.ctx.fill();
        console.log("this is a ball")
    };

    // TODO: function name is confusing
    moveBulletForward() {
        this.myVar= setInterval(() => { this.shootForward() }, 1000 / 60);         
         console.log("here ")
    };
    moveBulletBackward() {
        this.myVar= setInterval(() => { this.shootBackward() }, 1000 / 60);        
         console.log("here ")
    };

    stopBullet(){
        clearInterval(this.myVar);
        
    }

    // TODO: function names: verb
    shootForward() {
        this.ctx.clearRect(this.ball_start_point + TANK_BALL_CLEAR_X_1, this.ball_end_point - TANK_BALL_CLEAR_Y, 100, 100);
        Y_AXIS_SPEED -= GRAVITY;
        this.ball_end_point -= Y_AXIS_SPEED * 8;
        this.ball_start_point += X_AXIS_SPEED * 8;

        if (this.ball_end_point < this.c.height / 2) { // if ball hits the height of canvas

            Y_AXIS_SPEED *= -0.01; // then reverse and reduce its vertical speed
        }
        if (this.ball_start_point > 1500 || this.ball_end_point > this.y) { // if ball goes beyond canvas
            return
        }
        this.drawBall1();        
    };

    // TODO: function names: verb
    shootBackward() {
        this.ctx.clearRect(this.ball_start_point - TANK_BALL_CLEAR_X_2, this.ball_end_point - TANK_BALL_CLEAR_Y, 100, 100);
        Y_AXIS_SPEED -= GRAVITY;
        this.ball_end_point -= Y_AXIS_SPEED * 8;
        this.ball_start_point -= X_AXIS_SPEED * 8;

        if (this.ball_end_point < this.c.height / 2) { // if ball hits the height of canvas

            Y_AXIS_SPEED *= -0.01; // then reverse and reduce its vertical speed
        }
        if (this.ball_start_point < 100 || this.ball_end_point > this.y) { // if ball goes beyond canvas
            return
        }

        this.drawBall2();        
    };

      
    // TODO: clean up the if/elses to make it more concise
    arrowKeyControl() {
        document.addEventListener("keydown", Event => {
            this.ctx.clearRect(0, 0, innerWidth, innerHeight)
            if (Event.key === "ArrowRight") {
                this.x += TANK_MOVE_INTERVALS;
                this.aim_start_point_x += TANK_AIM_MOVE_INTERVALS;
                this.ctx.drawImage(this.img, this.x, this.y, IMAGE_WIDTH, IMAGE_HEIGHT);
                this.tankAim1()
            } //right arrow
            else if (Event.key === "ArrowLeft") {
                this.x -= TANK_MOVE_INTERVALS;
                this.aim_start_point_x -= TANK_AIM_MOVE_INTERVALS;
                this.ctx.drawImage(this.img, this.x, this.y, IMAGE_WIDTH, IMAGE_HEIGHT);
                this.tankAim1()
            }
            //left arrow 
            else if (Event.key === "ArrowUp") {
                let upLimit = true
                if (this.barrel_limit > -30 && upLimit) {
                    this.ctx.drawImage(this.img, this.x, this.y, IMAGE_WIDTH, IMAGE_HEIGHT);
                    this.barrel_limit -= UP_MOVEMENT_ON_EACH_CLICK;
                    //move the tank aim up  as the variable t changes
                    this.ctx.beginPath();
                    this.ctx.moveTo(this.aim_start_point_x, this.aim_start_point_y);
                    this.ctx.lineTo(this.aim_start_point_x + 60 + this.barrel_limit, this.aim_start_point_y - 10 + this.barrel_limit);
                    this.ctx.lineWidth = 10;
                    this.ctx.stroke();
                }
                else {
                    this.ctx.drawImage(this.img, this.x, this.y, IMAGE_WIDTH, IMAGE_HEIGHT);
                    this.ctx.beginPath();
                    this.ctx.moveTo(this.aim_start_point_x, this.aim_start_point_y);
                    this.ctx.lineTo(this.aim_start_point_x + 60 + this.barrel_limit, this.aim_start_point_y - 10 + this.barrel_limit);
                    this.ctx.lineWidth = 10;
                    this.ctx.stroke();
                    upLimit = false
                }

            } //arrow up
            else if (Event.key === "ArrowDown") {
                console.log("down");
                let downLimit = true
                if (this.barrel_limit < 10 && downLimit) {
                    this.ctx.drawImage(this.img, this.x, this.y, IMAGE_WIDTH, IMAGE_HEIGHT);
                    this.barrel_limit += UP_MOVEMENT_ON_EACH_CLICK;
                    this.ctx.beginPath();
                    this.ctx.moveTo(this.aim_start_point_x, this.aim_start_point_y);
                    this.ctx.lineTo(this.aim_start_point_x + 60 + this.barrel_limit, this.aim_start_point_y - 10 + this.barrel_limit);
                    this.ctx.lineWidth = 10;
                    this.ctx.stroke();
                }
                else {
                    this.ctx.drawImage(this.img, this.x, this.y, IMAGE_WIDTH, IMAGE_HEIGHT);
                    this.ctx.beginPath();
                    this.ctx.moveTo(this.aim_start_point_x, this.aim_start_point_y);
                    this.ctx.lineTo(this.aim_start_point_x + 60 + this.barrel_limit, this.aim_start_point_y - 10 + this.barrel_limit);
                    this.ctx.lineWidth = 10;
                    this.ctx.stroke();
                    downLimit = false
                }
            }
            else {
                console.log("invalid key");
                this.ctx.drawImage(this.img, this.x, this.y, IMAGE_WIDTH, IMAGE_HEIGHT);
                this.tankAim();
            }
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
                X_AXIS_SPEED = 2;
                Y_AXIS_SPEED = 2;
                this.count += 1;
                this.ctx.drawImage(this.img, this.x, this.y, IMAGE_WIDTH, IMAGE_HEIGHT);
                this.tankAim1();
                this.drawBall1();
                this.moveBulletForward();  
            }
            else {
                console.log("invalid key");
                this.ctx.drawImage(this.img, this.x, this.y, IMAGE_WIDTH, IMAGE_HEIGHT);
                this.tankAim1();
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
                X_AXIS_SPEED = 2;
                Y_AXIS_SPEED = 2;
                this.count += 1;
                this.ctx.drawImage(this.img, this.x, this.y, IMAGE_WIDTH, IMAGE_HEIGHT);
                this.tankAim2();
                this.drawBall2();
                this.moveBulletBackward();  
            }

            else {
                console.log("invalid key");
                this.ctx.drawImage(this.img, this.x, this.y, IMAGE_WIDTH, IMAGE_HEIGHT);
                this.tankAim2();
            }
        });

    }
}




function startGame(){
    const tank1 = new Tank(250, 400)
    const tank2 = new Tank(700, 400)     
    tank1.tankAim1()
    tank1.drawTank()
    tank2.tankAim2()
    tank2.drawTank()
    //tank2.drawBall2()
    tank2.arrowKeyControl()  
    tank1.buttomKeyControl1()
    tank2.buttomKeyControl2() 
}
startGame();




























