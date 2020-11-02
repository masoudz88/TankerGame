// call the canvas from index.html
function Tank(x,y,xmove,ymove){
    this.x=x
    this.y=y
    this.xmove= xmove
    this.ymove=ymove
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
    this.update= function(){
        this.x=this.x+this.xmove;
        this.y=this.y+this.ymove;
        
    };
    this.draw= function(){        
        this.update();
        c.drawImage(image,this.x,this.y,150,150)
    };
    
}
let tank1=new Tank(200,400,200,100);
tank1.draw()

console.log(tank1.getX())









    



