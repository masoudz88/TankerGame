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
        this.radius=5;
        this.g=0.1;
        this.vx=2;
        this.vy=0;
        //this.q=this.a+70;
        //this.p=this.b-10;
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
            this.ctx.clearRect(0, 0, 15, 15);            
            this.ctx.beginPath();
            this.ctx.arc(this.aim_start_point_x+70, this.aim_start_point_y-10, this.radius, 0, Math.PI*2, true);
            this.ctx.closePath();
            this.ctx.fill();
            console.log("this is a ball")
            };
        
        // TODO: function name is confusing
        moveBullet(){
            setInterval(() => { this.onEachStep() }, 1000/60);
        };

        // TODO: function names: verb
        moveOnEachStep () {
            this.vy += this.g; // gravity increases the vertical speed
            this.q += this.vx; // horizontal speed increases horizontal position
            this.p += this.vy; // vertical speed increases vertical position
            //if (this.y > this.c.innerheight - this.radius){ // if ball hits the ground
            //this.y = this.c.innerheight - this.radius; // reposition it at the ground
            //this.vy *= -0.8; // then reverse and reduce its vertical speed
            //}
            //if (this.x > this.c.innerwidth + this.radius){ // if ball goes beyond canvas
           // this.x = -this.radius; // wrap it around
            //}
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
                    if (this.t<10 && downLimit){ 
                        this.ctx.drawImage(this.img, this.x, this.y,IMAGE_WIDTH,IMAGE_HEIGHT);
                        this.t +=UP_MOVEMENT_ON_EACH_CLICK;
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
                    this.count+=1;                    
                    this.ctx.drawImage(this.img, this.x, this.y,IMAGE_WIDTH,IMAGE_HEIGHT);
                    this.tankAim();
                    //this.drawBall();
                    //this.onEachStep();
                    this.init()
                    
                        
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
    

   

    
    
    
 
 
     
    














    



