const canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const x = canvas.width/2;
const y = canvas.height/2;

const ctx = canvas.getContext('2d');

const colorPallete = ['#6f2dbd', '#a663cc', '#b298dc', '#b9faf8', '#b8d0eb']

addEventListener('resize', (event)=>{
    canvas.width = window.innerWidth;
    canvas.height = windows.innerHeight;
    Init()
})

let isMouseDown = false;

addEventListener('mousedown', ()=>{
    isMouseDown = true;
})

addEventListener('mouseup', ()=>{
    isMouseDown = false;
})

function RandomWithinRange(min, max){
    let randomValue = Math.random() * max;
        while(true){
            if (randomValue < min){
                randomValue = Math.random() * max;
            }
            else{
                break
            }
    }
    return randomValue;
}

class Particle{
    
    constructor(x, y, radius, color){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocity = 0.04;
        this.radians = Math.random() * Math.PI*2;
        this.distanceFromCenter = RandomWithinRange(50, 100);
    }
    
    
    draw = function(){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 15;
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    update = function (){
        this.draw();
    }

}

let particles = []

function Init(){

    let canvasWidth = canvas.width;
    let canvasHeight = canvas.height;

    for (var i = 0; i < 100; i++){
        let randomRadius = RandomWithinRange(1, 3)
        let randomColor = parseInt(Math.random() * colorPallete.length)


        let x = canvas.width * Math.random() - canvasWidth/2;
        let y = canvas.height * Math.random() - canvasHeight/2;

        particles.push(new Particle(x, y, randomRadius, colorPallete[randomColor]));
    }
}

let radians = 0;
let speed = 1;
let alpha = 1

function Animate(){
    requestAnimationFrame(Animate);

    ctx.fillStyle = `rgba(27,27,27, ${alpha})`;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    

    ctx.save();
    ctx.translate(canvas.width/2, canvas.height/2);
    ctx.rotate(radians)

    for (var i = 0; i < particles.length; i++){
        particles[i].update();
    }

    ctx.restore()

    if (isMouseDown){
        if (alpha > 0.0001){
            alpha -= 0.01
        }
        if (speed < 5){
            speed += 0.01;
        }
    }
    else{
        if (alpha < 1){
            alpha += 0.01;
        }
        if (speed > 1){
            speed -= 0.01;
        }
    }
    
    radians += 0.001 * speed;



}

Init();
Animate()