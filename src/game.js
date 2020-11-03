// call the canvas from index.html
function Tank(x,y){
    this.x=x
    this.y=y
    this.xmove= 10
    this.ymove= 10
    
    let canvas= document.querySelector("canvas");
    //set the dimensions of canvas
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    let c = canvas.getContext('2d');
    // adding tank image on canvas
    let image= new Image();
    image.src='images/tank_2.png'
    //c.drawImage(image,this.x,this.y,150,150)

    this.getX= function(){
        return this.x
    }
    /*this.update= function(){
        this.x=this.x+this.xmove;       
        
    };*/
    this.show= function(){         
        c.drawImage(image,this.x,this.y,150,150)
    };
    //moving tank object with arrow keys
    let interval;
    document.addEventListener("keydown", Event =>{        
            if (Event.key === ArrowRight) {
                interval=setInterval(moveRight, this.xmove)
            } //right arrow
            else if (Event.key === ArrowLeft) {
                interval=setInterval(moveLeft, this.xmove)
            } //left arrow        
        });  
    document.addEventListener("keyup", Event =>{   
        clearInterval(interval)
    } );  
    
}
    
    


let tank1=new Tank(200,400);
tank1.show()












    



