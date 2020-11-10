// call the canvas from index.html
class Tank {
    constructor(x,y){
        this.x=x;
        this.y=y;
        this.c = document.getElementById("myCanvas");            
        this.c.width = window.innerWidth;
        this.c.height = window.innerHeight;        
        this.ctx = this.c.getContext("2d");
        this.img = document.getElementById("tank");        
        console.log("Tank")
    }
        
        drawTank(){             
            this.ctx.drawImage(this.img, this.x, this.y,150,150);            
        }

        tankAim(){ 
            for (let i=0; i<7; i++){                
                this.ctx.beginPath();
                this.ctx.moveTo(this.x+90-i, this.y+70-i);
                this.ctx.lineTo(this.x+150-i, this.y+60-i);            
                this.ctx.stroke();
            }           
            
        }
        
        /*aimMove()   {
            document.addEventListener("keydown", Event =>{        
                this.ctx.clearRect(0,0, innerWidth, innerHeight)
                if (Event.key === "ArrowUp") {
                    console.log("up");
                    this.x-=10;
                    this.y-=10;                     
                    this.ctx.lineTo(this.x+150, this.y+60);            
                    this.ctx.stroke();                     
                    
                    } //arrow up
                else if (Event.key === "ArrowDown") {
                    console.log("down");
                    this.x+=10;
                    this.y+=10;                    
                    this.ctx.lineTo(this.x+150, this.y+60);            
                    this.ctx.stroke();
                }//arrow down 
                           
                });

        } */
            
        
        movement(){            
            
            document.addEventListener("keydown", Event =>{        
                this.ctx.clearRect(0,0, innerWidth, innerHeight)
                if (Event.key === "ArrowRight") {
                    console.log("right");
                    this.x+=10; 
                    this.ctx.drawImage(this.img, this.x, this.y,150,150);
                    this.tankAim() 
                    if (this.x> innerWidth ) {
                        this.x=200;
                    }   
                    
                    } //right arrow
                else if (Event.key === "ArrowLeft") {
                    console.log("left");
                    this.x-=10;
                    this.ctx.drawImage(this.img, this.x, this.y,150,150); 
                    this.tankAim()
                }//left arrow 
                           
                });
        }
    }

    const myTank= new Tank(200,400)
        
    myTank.movement() 
    myTank.tankAim() 
    myTank.drawTank() 
    //myTank.aimMove()  
    console.log(myTank)
    
 
 
     
    














    



