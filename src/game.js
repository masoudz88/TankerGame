// call the canvas from index.html
let canvas= document.querySelector("canvas");
//set the dimensions of canvas
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let c = canvas.getContext('2d');

let image= new Image();
image.src='images/tank_2.png'
c.drawImage(image,100,400,150,150)





    



