const canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const x = canvas.width/2;
const y = canvas.height/2;

const ctx = canvas.getContext('2d');

const colorPallete = ['#49108B', '#7E30E1', '#E26EE5', '#F3F8FF']

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

var mouse = {
    x: undefined,
    y: undefined
}

addEventListener('mousemove', (event)=>{
    mouse.x = event.clientX;
    mouse.y = event.clientY;
})

class Particle{
    
    constructor(x, y, radius, color){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocity = 0.04;
        this.radians = Math.random() * Math.PI*2;
        this.distanceFromCenter = RandomWithinRange(30, 50);
        this.history = {x: mouse.x, y: mouse.y}
        this.lineShader = [{x: this.x, y: this.y}]
    }
    
    
    draw = function(){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
    
        ctx.fillStyle = this.color;
        ctx.fill();
        
        ctx.beginPath()
        ctx.strokeStyle = this.color
        ctx.lineWidth = 0.5
        ctx.moveTo(this.x, this.y)

        for (let i = 0; i < this.lineShader.length; i++){
            ctx.lineTo(this.lineShader[i].x, this.lineShader[i].y)
        }

        ctx.stroke();

    }

    update = function (){

        this.radians += this.velocity;
        this.x = this.history.x + Math.cos(this.radians) * this.distanceFromCenter;
        this.y = this.history.y + Math.sin(this.radians) * this.distanceFromCenter;

        this.draw();

        this.history = mouse;
    }

}

let particles = []

function Init(){
    for (var i = 0; i < 20; i++){
        let randomRadius = RandomWithinRange(2, 4)
        let randomColor = parseInt(Math.random() * 4)
        particles.push(new Particle(canvas.width/2, canvas.height/2, randomRadius, colorPallete[randomColor]));
    }
}

function Animate(){
    requestAnimationFrame(Animate);

    ctx.fillStyle = 'rgba(27,27,27, 0.03)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    for (var i = 0; i < particles.length; i++){
        particles[i].update();
    }
}

// setInterval(()=>{
//     ctx.fillStyle = 'rgba(27,27,27, 1)';
//     ctx.fillRect(0, 0, canvas.width, canvas.height);
// }, 10)

Init();
Animate()