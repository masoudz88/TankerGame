// TODO: move the ball

// call the canvas from index.html

let gameData;

let TANK_BARREL_GAP_Y, TANK_BARREL_GAP_X, TANK_MOVE_INTERVALS, TANK_AIM_MOVE_INTERVALS, UP_MOVEMENT_ON_EACH_CLICK,
    IMAGE_WIDTH, IMAGE_HEIGHT, TANK_BARREL_ENDPOINT_GAP_X, TANK_BARREL_ENDPOINT_GAP_Y, TANK_BALL_GAP_X_1, TANK_BALL_GAP_X_2,
    TANK_BALL_GAP_Y, TANK_BALL_CLEAR_X_1, TANK_BALL_CLEAR_X_2, TANK_BALL_CLEAR_Y, X_AXIS_SPEED, Y_AXIS_SPEED, GRAVITY;

let tankCounter = 0;
const c = document.getElementById("myCanvas");
c.width = 2*window.innerWidth;
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
        this.aim_end_point_x=this.aim_start_point_x;
        this.aim_start_point_y = this.y + gameData.TANK_BARREL_GAP_Y; // TODO: magic variable -> constants
        this.aim_end_point_y=this.aim_start_point_y;
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
        this.drawImage();
        ctx.beginPath();
        ctx.moveTo(this.aim_start_point_x, this.aim_start_point_y);
        if (this.direction == "left") {
            ctx.lineTo(this.aim_end_point_x + gameData.TANK_BARREL_ENDPOINT_GAP_X, this.aim_end_point_y - gameData.TANK_BARREL_ENDPOINT_GAP_Y);
        }
        else if (this.direction == "right") {
            ctx.lineTo(this.aim_end_point_x - 110, this.aim_end_point_y - gameData.TANK_BARREL_ENDPOINT_GAP_Y);
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
    }


    // TODO: function name is confusing
    moveBullet() {
        if (this.direction == "left") {
            this.myVar = setInterval(() => { this.shooting() }, 1000 / 60);            
        }
        else if (this.direction == "right") {
            this.myVar = setInterval(() => { this.shooting() }, 1000 / 60);            
        }    
        
    }

    stopBullet() {
        clearInterval(this.myVar);
    }

    // TODO: function names: verb
    shooting() {
        rerender();
        gameData.Y_AXIS_SPEED -= gameData.GRAVITY;
        this.ball_end_point -= gameData.Y_AXIS_SPEED * 8;
        if (this.direction == "left"){
            this.ball_start_point += gameData.X_AXIS_SPEED * 8;
            if (this.ball_start_point > c.width || this.ball_end_point > this.y+100) { // if ball goes beyond canvas
                return
            }
        }
        else if(this.direction == "right"){
            this.ball_start_point -= gameData.X_AXIS_SPEED * 8;
            if (this.ball_start_point < 100 || this.ball_end_point > this.y+100) { // if ball goes beyond canvas
                return
            }
        }

        if (this.ball_end_point < c.height / 2) { // if ball hits the height of canvas

            gameData.Y_AXIS_SPEED *= -0.01; // then reverse and reduce its vertical speed
        }
        
        this.drawBall();        
        
        if(collision()){
            console.log("collision");
            this.count++;            
            if (turn==tank1.tankTurn){                
                turn=tank2.tankTurn;                
                
           }else if(turn==tank2.tankTurn){                
                turn=tank1.tankTurn;                             
           }
           
           winner_identifier();    
            
        };        
    }    
    


    // TODO: clean up the if/elses to make it more concise
    keyControl() {
        document.addEventListener("keydown", Event => {
            this.stopBullet();//remove interval after the turn is cahnged
            if(turn == this.tankTurn) {

            if (Event.key === "ArrowRight") {
                if(this.x<=c.width-160 ){
                this.x += gameData.TANK_MOVE_INTERVALS;
                this.aim_start_point_x += gameData.TANK_AIM_MOVE_INTERVALS;
                this.aim_end_point_x += gameData.TANK_AIM_MOVE_INTERVALS;            
                
                }                
            } //right arrow
            else if (Event.key === "ArrowLeft") {
                if(this.x>=20 ){
                this.x -= gameData.TANK_MOVE_INTERVALS;
                this.aim_start_point_x -= gameData.TANK_AIM_MOVE_INTERVALS;
                this.aim_end_point_x -= gameData.TANK_AIM_MOVE_INTERVALS; 
                console.log(this.x);                  
                }        
            }
            //left arrow 
            else if (Event.key === "ArrowUp") {
                
                if (this.barrel_limit > -30 ) {
                    this.drawImage();
                    this.barrel_limit -= gameData.UP_MOVEMENT_ON_EACH_CLICK;                                           
                    this.aim_end_point_y=this.aim_end_point_y + (this.barrel_limit*0.3);  
                    //this.aim_end_point_x=this.aim_end_point_x - (this.barrel_limit*0.1);                                         
                    
                }               

            } //arrow up
            else if (Event.key === "ArrowDown") {                              
                if (this.barrel_limit < 0) {
                    this.drawTank();
                    this.barrel_limit += gameData.UP_MOVEMENT_ON_EACH_CLICK;
                    this.aim_end_point_y=this.aim_end_point_y - (this.barrel_limit*0.5);
                }                
            } 
            else if (Event.key === "s" || Event.key === "S") {
                console.log(turn, this.tankTurn)                
                
                    this.stopBullet()// clear the interval
                    this.ball_start_point = this.aim_start_point_x;
                    this.ball_end_point = this.aim_start_point_y;
                    gameData.X_AXIS_SPEED = 2;
                    gameData.Y_AXIS_SPEED = 2;                
                    this.drawTank();                   
                    this.drawBall();
                    this.moveBullet();                                        
                };                            
                     
            
            rerender(); 
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

let turn=Math.floor(Math.random() * 2);
function rerender() {
    ctx.clearRect(0, 0, c.width, c.height);
    tank1.drawTank()
    tank2.drawTank();         
}
let tank1, tank2;
function startGame() {
    tank1 = new Tank(250, 400, "left")
    tank2 = new Tank(700, 400, "right")    
    rerender(); 
    key_control_tanks();                
}
getData();

function collision(){    
    if(turn == 0 && (tank1.ball_start_point > tank2.x-200 && tank1.ball_start_point< tank2.x ) && (tank1.ball_end_point > tank2.y && tank1.ball_end_point < tank2.y + 15)){        
        return true;
    }
    else if(turn == 1 && (tank2.ball_start_point > tank1.x+230 && tank2.ball_start_point< tank1.x + 350) && (tank2.ball_end_point > tank1.y && tank2.ball_end_point < tank1.y + 15)){
        return true;
    }
}
function key_control_tanks(){   
        tank1.keyControl()    
        tank2.keyControl()
   
}

function winner_identifier(){
    if(tank1.count==3 ||tank2.count==3){      
        if(tank1.count>tank2.count){
            swal("GAME OVER", "Winner is Tank 1",{
                buttons: ["Play Again!"],
            });        
        }else if(tank2.count>tank1.count){
            swal("GAME OVER", "Winner is Tank 2",{
                buttons: ["Play Again!"],
            }); 
        }else{
            swal("GAME OVER","Draw");
        }
    }
}






