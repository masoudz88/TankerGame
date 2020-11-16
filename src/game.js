// call the canvas from index.html
class Tank {
    constructor(x,y,a,b){
        this.x=x;
        this.y=y;
        this.a=this.x+90;
        this.b=this.y+70;
        this.w=0;
        this.count=0;
        this.t=0;
        this.c = document.getElementById("myCanvas");            
        this.c.width = window.innerWidth;
        this.c.height = window.innerHeight;        
        this.ctx = this.c.getContext("2d");
        this.img = document.getElementById("tank");        
        console.log("constructed the tank")
    }
        
        drawTank(){    
            console.log("drawing tank");
            this.ctx.drawImage(this.img, this.x, this.y,150,150); 
        }

        tankAim(){ 
            //for (let i=0; i<7; i++){                
                this.ctx.beginPath();
                this.ctx.moveTo(this.a, this.b);
                this.ctx.lineTo(this.a+60, this.b-10); 
                this.ctx.lineWidth = 10;
                this.ctx.stroke();                       
            
        }

            
        
        movement(){            
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
                    this.ctx.drawImage(this.img, this.x, this.y,150,150);                    
                    this.t -=5; 
                    //move the tank aim up  as the variable t changes
                    this.ctx.beginPath();
                    this.ctx.moveTo(this.a, this.b);
                    this.ctx.lineTo(this.a+60+this.t, this.b-10+this.t); 
                    this.ctx.lineWidth = 10;
                    this.ctx.stroke();                   
                    } //arrow up
                else if (Event.key === "ArrowDown") {
                    console.log("down");
                    this.ctx.drawImage(this.img, this.x, this.y,150,150);
                    this.t +=5;
                    //move the tank aim down  as the variable t changes 
                    this.ctx.beginPath();
                    this.ctx.moveTo(this.a, this.b);
                    this.ctx.lineTo(this.a+60+this.t, this.b-10+this.t); 
                    this.ctx.lineWidth = 10;
                    this.ctx.stroke();
                    
                }//arrow down 
                else if (Event.key === "s") {
                    console.log("s"); 
                    this.w+=1;
                    this.count+=1;
                    console.log(this.count);                                       
                    for(let i=0; i<=100; i++){
                        this.ctx.beginPath();
                        this.ctx.clearRect(this.a+60-8+i, this.b-20-this.w, 15, 15);
                        this.ctx.closePath();
                        this.ctx.drawImage(this.img, this.x, this.y,150,150);
                        this.tankAim();
                        this.ctx.beginPath();
                        this.ctx.arc(this.a+60+i, this.b-10-this.w, 1, 0, Math.PI*2, false);
                        this.ctx.closePath();                    
                        this.ctx.stroke();                                                                        

                    }
                     
                    
                    
                }//arrow down
                else{
                    console.log("invalid key");
                    this.ctx.drawImage(this.img, this.x, this.y,150,150);
                }
            });                   
            
        }
    }

    const myTank= new Tank(200,400,200,400)
        
    myTank.movement() 
    myTank.tankAim() 
    myTank.drawTank() 
    //myTank.aimMove()  
    console.log(myTank)

    
    
 
 
     
    














    



