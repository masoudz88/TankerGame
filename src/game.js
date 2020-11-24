// call the canvas from index.html
function Tank(x,y) {
    //constructor(x,y){
        this.x=x;
        this.y=y;
        this.a=this.x+90;
        this.b=this.y+70;        
        this.radius=5;
        this.g=0.1;
        this.vx=2;
        this.vy=0;
        this.q=this.a+70;
        this.p=this.b-10;
        this.count=0;
        this.t=0;
        this.c = document.getElementById("myCanvas");            
        this.c.width = window.innerWidth;
        this.c.height = window.innerHeight;        
        this.ctx = this.c.getContext("2d");
        this.img = document.getElementById("tank");        
        console.log("constructed the tank")
    //}
        
        Tank.prototype.drawTank=function(){    
            console.log("drawing tank");
            this.ctx.drawImage(this.img, this.x, this.y,150,150); 
        }

        Tank.prototype.tankAim=function(){ 
            //for (let i=0; i<7; i++){                
                this.ctx.beginPath();
                this.ctx.moveTo(this.a, this.b);
                this.ctx.lineTo(this.a+65, this.b-10); 
                this.ctx.lineWidth = 10;
                this.ctx.stroke();                       
            
        }
        //making the ball to move
        Tank.prototype.drawBall=function() {                   
            //this.ctx.clearRect(0, 0, 15, 15);
            //fillStyle = color;
            this.ctx.beginPath();
            this.ctx.arc(this.a+70, this.b-10, this.radius, 0, Math.PI*2, true);
            this.ctx.closePath();
            this.ctx.fill();            
            };
            
        Tank.prototype.init=function(){
            setInterval(this.onEachStep(),  1000/60);            
        };
        
        Tank.prototype.onEachStep=function() {
            this.vy += this.g; // gravity increases the vertical speed
            this.q += this.vx; // horizontal speed increases horizontal position
            this.p += this.vy;// vertical speed increases vertical position            
            this.drawBall();
            console.log("hi")
        };

            
        
        Tank.prototype.movement=function(){            
            document.addEventListener("keydown", Event =>{        
                this.ctx.clearRect(0,0, innerWidth, innerHeight)
                if (Event.key === "ArrowRight") {
                    console.log("right");
                    this.x+=10;
                    this.a+=10;
                    this.ctx.drawImage(this.img, this.x, this.y,150,150);
                    this.tankAim() 
                    if (this.x> innerWidth ) {
                        this.x=200;
                    }   
                    
                    } //right arrow
                else if (Event.key === "ArrowLeft") {
                    console.log("left");
                    this.x-=10;
                    this.a-=10;
                    this.ctx.drawImage(this.img, this.x, this.y,150,150); 
                    this.tankAim()
                }
                //left arrow 
                else if (Event.key === "ArrowUp") {
                    console.log("up");
                    let upLimit=true
                    if (this.t>-30 && upLimit){
                        this.ctx.drawImage(this.img, this.x, this.y,150,150);                    
                        this.t -=5; 
                        //move the tank aim up  as the variable t changes
                        this.ctx.beginPath();
                        this.ctx.moveTo(this.a, this.b);
                        this.ctx.lineTo(this.a+60+this.t, this.b-10+this.t); 
                        this.ctx.lineWidth = 10;
                        this.ctx.stroke();
                    }
                    else{
                        this.ctx.drawImage(this.img, this.x, this.y,150,150);                        
                        this.ctx.beginPath();
                        this.ctx.moveTo(this.a, this.b);
                        this.ctx.lineTo(this.a+60+this.t, this.b-10+this.t); 
                        this.ctx.lineWidth = 10;
                        this.ctx.stroke();
                        upLimit=false
                    }
                                       
                    } //arrow up
                else if (Event.key === "ArrowDown") {
                    console.log("down");
                    let downLimit=true
                    if (this.t<10 && downLimit){ 
                        this.ctx.drawImage(this.img, this.x, this.y,150,150);
                        this.t +=5;
                        this.ctx.beginPath();
                        this.ctx.moveTo(this.a, this.b);
                        this.ctx.lineTo(this.a+60+this.t, this.b-10+this.t); 
                        this.ctx.lineWidth = 10;
                        this.ctx.stroke();
                    }
                    else{
                        this.ctx.drawImage(this.img, this.x, this.y,150,150);                        
                        this.ctx.beginPath();
                        this.ctx.moveTo(this.a, this.b);
                        this.ctx.lineTo(this.a+60+this.t, this.b-10+this.t); 
                        this.ctx.lineWidth = 10;
                        this.ctx.stroke();
                        downLimit=false
                    }
                }//arrow down
                //shooting when pressing s 
                else if (Event.key === "s") {
                    console.log("s");                     
                    this.count+=1;                    
                    this.ctx.drawImage(this.img, this.x, this.y,150,150);
                    this.tankAim();                    
                    this.init()
                    
                        
                }//arrow down
                else{
                    console.log("invalid key");
                    this.ctx.drawImage(this.img, this.x, this.y,150,150);
                    this.tankAim();
                }
            });                   
            
        }
    }
    
        

    myTank= new Tank(250,400)   
        
    myTank.movement() 
    myTank.tankAim() 
    myTank.drawTank()  
    //console.log(myTank)    
    

   

    
    
    
 
 
     
    














    



