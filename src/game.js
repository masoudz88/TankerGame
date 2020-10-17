var canvas= document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var c = canvas.getContext('2d');


function Rectangle(x,y,w,h,dx){
    this.x=x;
    this.y=y;
    this.w=w;
    this.h=h;
    this.dx=dx;

    this.draw= function(){        
        c.fillRect(this.x, this.y, this.w, this.h);
        c.fillStyle="rgba(255,0,0,0.5)"; 
    }
    this.update= function(){
        if(this.x>550 || this.x<0){
            this.dx=-this.dx;
        }
        this.x+=this.dx;
        this.draw();
    }
}

function Rectangle2(x,y,w,h,dx){
    this.x=x;
    this.y=y;
    this.w=w;
    this.h=h;
    this.dx=dx;

    this.draw= function(){        
        c.fillRect(this.x, this.y, this.w, this.h); 
        c.fillStyle="rgba(0,0,255,0.5)";       
        }
    
    this.update= function(){
        if(this.x<650 || this.x+100>innerWidth){
            this.dx=-this.dx;
        }
        this.x+=this.dx;
        this.draw();
    }
}
var rectangle= new Rectangle(200,350,100,100,4)
var rectangle2= new Rectangle2(800,350,100,100,4)



        function animateReverse() {
            requestAnimationFrame(animateReverse);
            c.clearRect(0, 0, innerWidth, innerHeight);
            rectangle.update();
            rectangle2.update();            
        }
        animateReverse();
    



