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
    this.update= function(){
        this.x=this.x+this.xmove;       
        
    };
    this.show= function(){         
        c.drawImage(image,this.x,this.y,150,150)
    };
    //moving tank object with arrow keys
    
    function onkeydown() {
        if (Event.keyCode == 39) {
            this.x +=this.xmove;
        } //right arrow
        else if (Event.keyCode == 37) {
            this.x-= this.xmove;
        } //left arrow
        else if (Event.keyCode == 38) {
            this.y-= this.ymove;
        } //up arrow
        else if (Event.keyCode == 40) {
            this.y+= this.ymove;
        } //down arrow
        c.drawImage(image,this.x,this.y,150,150)
    }
    window.addEventListener("keydown", onkeydown);
    
}
function draw(){
    let tank1=new Tank(200,400,200,100);
    tank1.update()
    tank1.show()
}

draw()










    



