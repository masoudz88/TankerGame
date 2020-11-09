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
        movement(){
            document.addEventListener("keydown", Event =>{        
                
                if (Event.key === "ArrowRight") {
                    console.log("right");
                    this.x+=10; 
                    this.ctx.drawImage(this.img, this.x, this.y,150,150);    
                    
                    } //right arrow
                else if (Event.key === "ArrowLeft") {
                    console.log("left");
                    this.x-=10;
                    this.ctx.drawImage(this.img, this.x, this.y,150,150);
                    } //left arrow        
                });
        }
    }

    const myTank= new Tank(200,400)
    myTank.drawTank()    
    myTank.movement()    
    console.log(myTank)
    
 
 
     
    














    



