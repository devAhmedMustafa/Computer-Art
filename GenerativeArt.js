const canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');

const colorPallete = [43, 39, 34, 23, 12, 0, 358]
const colorPallete2 = [333, 309, 276, 286, 263, 285, 243, 229, 212, 194]

var drawing = false;

addEventListener('resize', (e)=>{
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    ctx.clearRect(0,0, canvas.width, canvas.height)
})

class Root{
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.vx = Math.random() * 4 - 2;
        this.vy = Math.random() * 4 - 2;
        this.maxSize = Math.random() * 7 + 5;
        this.size = Math.random() + 2;
        this.angle = Math.random() * 6.2;
        this.vs = Math.random() * 0.2 + 0.05;
        this.va = Math.random() * 0.6 - 0.3;
        this.ligthness = 60;
        this.planted = false;

        this.color = colorPallete2[ Math.floor(Math.random() * colorPallete2.length) ]
    }

    draw(){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.shadowColor = `hsl(${this.color}, ${this.ligthness}%,50%)`
        ctx.shadowBlur = 20
        ctx.fillStyle = `hsl(${this.color}, ${this.ligthness}%,50%)`;
        ctx.fill()
    }

    update(){
        this.x += this.vx + Math.sin(this.angle);
        this.y += this.vy + Math.sin(this.angle);
        this.size += this.vs;
        this.angle += this.va;
        this.ligthness += 5;
        if(this.size < this.maxSize){
            this.draw();
            requestAnimationFrame(this.update.bind(this))
        }
    }

    

}

window.addEventListener('mousedown', function(){
    drawing = true;
})

window.addEventListener('mouseup', function(){
    drawing = false;
})

window.addEventListener('mousemove', function(e){
    if (drawing){
        const root = new Root(e.x, e.y);
        root.update();
    }
})

setInterval(()=>{
    ctx.clearRect(0,0,canvas.width,canvas.height)
}, 5000)