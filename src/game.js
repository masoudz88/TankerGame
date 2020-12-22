// TODO: move the ball

// call the canvas from index.html
const TANK_BARREL_GAP_Y = 70;
const TANK_BARREL_GAP_X = 90;
const TANK_MOVE_INTERVALS=10;
const TANK_AIM_MOVE_INTERVALS=10;
const UP_MOVEMENT_ON_EACH_CLICK=5;
const IMAGE_WIDTH=150;
const IMAGE_HEIGHT=150;
const TANK_BARREL_ENDPOINT_GAP_=65;


class Tank {
    constructor(x,y){
        this.x=x; 
        this.y=y;
        this.aim_start_point_x=this.x+TANK_BARREL_GAP_X; // TODO: bad naming (uncle bob)
        this.aim_start_point_y=this.y+TANK_BARREL_GAP_Y; // TODO: magic variable -> constants
        this.ball_start_point=this.aim_start_point_x;
        this.ball_end_point=this.aim_start_point_y;
        this.radius=5;       
        this.count=0;
        this.barrel_limit=0;
        this.c = document.getElementById("myCanvas");            
        this.c.width = window.innerWidth;
        this.c.height = window.innerHeight;        
        this.ctx = this.c.getContext("2d");
        this.img = document.getElementById("tank");  
        this.moveOnEachStep.bind(this);      
        console.log(this);
        console.log("constructed the tank")
    }
        
        drawTank(){    
            console.log("drawing tank");
            this.ctx.drawImage(this.img, this.x, this.y,IMAGE_WIDTH,IMAGE_HEIGHT); 
        }

        tankAim(){                            
                this.ctx.beginPath();
                this.ctx.moveTo(this.aim_start_point_x, this.aim_start_point_y);
                this.ctx.lineTo(this.aim_start_point_x+65, this.aim_start_point_y-10); 
                this.ctx.lineWidth = 10;
                this.ctx.stroke();                       
            
        }
        //making the ball to move
        drawBall() {                   
                        
            this.ctx.beginPath();
            this.ctx.arc(this.ball_start_point+70, this.ball_end_point-10, this.radius, 0, Math.PI*2, true);
            this.ctx.closePath();
            this.ctx.fill();
            console.log("this is a ball")
            };
        
        // TODO: function name is confusing
        moveBullet(){
            setInterval(() => { this.moveOnEachStep() }, 1000/60);
        };

        // TODO: function names: verb
        moveOnEachStep () {
            this.ctx.clearRect(this.ball_start_point+60, this.ball_end_point-10, 50, 50);            
            this.ball_start_point += 5; 
            this.ball_end_point -= 5;            
            this.drawBall();            
            console.log("hi")
        };

            
        // TODO: clean up the if/elses to make it more concise
        arrowKeyControl(){            
            document.addEventListener("keydown", Event =>{        
                this.ctx.clearRect(0,0, innerWidth, innerHeight)
                if (Event.key === "ArrowRight") {                    
                    this.x+=TANK_MOVE_INTERVALS;
                    this.aim_start_point_x+=TANK_AIM_MOVE_INTERVALS;
                    this.ctx.drawImage(this.img, this.x, this.y,IMAGE_WIDTH,IMAGE_HEIGHT);
                    this.tankAim()                                            
                    } //right arrow
                else if (Event.key === "ArrowLeft") {                    
                    this.x-=TANK_MOVE_INTERVALS;
                    this.aim_start_point_x-=TANK_AIM_MOVE_INTERVALS;
                    this.ctx.drawImage(this.img, this.x, this.y,IMAGE_WIDTH,IMAGE_HEIGHT); 
                    this.tankAim()
                }
                //left arrow 
                else if (Event.key === "ArrowUp") {                    
                    let upLimit=true
                    if (this.barrel_limit>-30 && upLimit){
                        this.ctx.drawImage(this.img, this.x, this.y,IMAGE_WIDTH,IMAGE_HEIGHT);                    
                        this.barrel_limit -=UP_MOVEMENT_ON_EACH_CLICK; 
                        //move the tank aim up  as the variable t changes
                        this.ctx.beginPath();
                        this.ctx.moveTo(this.aim_start_point_x, this.aim_start_point_y);
                        this.ctx.lineTo(this.aim_start_point_x+60+this.barrel_limit, this.aim_start_point_y-10+this.barrel_limit); 
                        this.ctx.lineWidth = 10;
                        this.ctx.stroke();
                    }
                    else{
                        this.ctx.drawImage(this.img, this.x, this.y,IMAGE_WIDTH,IMAGE_HEIGHT);                        
                        this.ctx.beginPath();
                        this.ctx.moveTo(this.aim_start_point_x, this.aim_start_point_y);
                        this.ctx.lineTo(this.aim_start_point_x+60+this.barrel_limit, this.aim_start_point_y-10+this.barrel_limit); 
                        this.ctx.lineWidth = 10;
                        this.ctx.stroke();
                        upLimit=false
                    }
                                       
                    } //arrow up
                else if (Event.key === "ArrowDown") {
                    console.log("down");
                    let downLimit=true
                    if (this.barrel_limit<10 && downLimit){ 
                        this.ctx.drawImage(this.img, this.x, this.y,IMAGE_WIDTH,IMAGE_HEIGHT);
                        this.barrel_limit +=UP_MOVEMENT_ON_EACH_CLICK;
                        this.ctx.beginPath();
                        this.ctx.moveTo(this.aim_start_point_x, this.aim_start_point_y);
                        this.ctx.lineTo(this.aim_start_point_x+60+this.barrel_limit, this.aim_start_point_y-10+this.barrel_limit); 
                        this.ctx.lineWidth = 10;
                        this.ctx.stroke();
                    }
                    else{
                        this.ctx.drawImage(this.img, this.x, this.y,IMAGE_WIDTH,IMAGE_HEIGHT);                        
                        this.ctx.beginPath();
                        this.ctx.moveTo(this.aim_start_point_x, this.aim_start_point_y);
                        this.ctx.lineTo(this.aim_start_point_x+60+this.barrel_limit, this.aim_start_point_y-10+this.barrel_limit); 
                        this.ctx.lineWidth = 10;
                        this.ctx.stroke();
                        downLimit=false
                    }
                }//arrow down
                //shooting when pressing s 
                else if (Event.key === "s") {
                    console.log("s"); 
                    this.ball_start_point=this.aim_start_point_x;
                    this.ball_end_point=this.aim_start_point_y;                    
                    this.count+=1; 
                    this.ctx.clearRect(0, 0, 15, 15);                    
                    this.ctx.drawImage(this.img, this.x, this.y,IMAGE_WIDTH,IMAGE_HEIGHT);
                    this.tankAim();  
                    this.drawBall();                                   
                    this.moveBullet()
                    
                        
                }//arrow down
                else{
                    console.log("invalid key");
                    this.ctx.drawImage(this.img, this.x, this.y,IMAGE_WIDTH,IMAGE_HEIGHT);
                    this.tankAim();
                }
            });                   
            
        }
    }
    
        

    const myTank= new Tank(250,400) 
    console.log("my tank")  
        
    myTank.arrowKeyControl() 
    myTank.tankAim() 
    myTank.drawTank()      
    //TODO: think about the project    
    

   

    
    
    
 
 
     
    














    



