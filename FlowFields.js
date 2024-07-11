const canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const x = canvas.width/2;
const y = canvas.height/2;

const ctx = canvas.getContext('2d');

ctx.fillStyle = 'white'
ctx.strokeStyle = 'white'
ctx.lineWidth = 1

const colorPallete = ["#004B23", "#006400", "#007200", "#008000", "#38B000", "#70E000", "#9EF01A", "#CCFF33"]

const colorPallete1 = ["#01EFAC", "#01CBAE", "#2082A6", "#524094", "#562A83"]

addEventListener('resize', (e)=>{
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    effect.init()
})

class Particle{
    
    constructor(effect){
        this.effect = effect
        this.x = Math.floor(Math.random() * this.effect.width);
        this.y = Math.floor(Math.random() * this.effect.height);
        this.speedX = Math.random() * 5 - 2.5;
        this.speedY = Math.random() * 5 - 2.5;
        this.speedModifier = Math.floor(Math.random()*5+1)
        this.history = [{x: this.x, y: this.y}]
        this.angle = 0;
        this.maxLength = Math.floor(Math.random()*1000+100)
        this.timer = this.maxLength;
        this.color = colorPallete1[parseInt(Math.random()*colorPallete1.length)]
    }
    
    
    draw(context){

        context.beginPath()
        context.moveTo(this.history[0].x, this.history[0].y)
        
        for (let i = 0; i < this.history.length; i++){
            context.lineTo(this.history[i].x, this.history[i].y)
        }

        context.shadowColor = this.color;
        context.shadowBlur = 10;

        context.shadowOffsetX = 0;
        context.shadowOffsetY = 0;

        context.strokeStyle = this.color;
        context.stroke();
    }

    update(){

        this.timer--;
        if (this.timer >= 1){
            let x = Math.floor(this.x / this.effect.cellSize)
            let y = Math.floor(this.y / this.effect.cellSize)

            let index = y * this.effect.cols + x;
            this.angle = this.effect.flowField[index];

            this.speedX = Math.cos(this.angle);
            this.speedY = Math.sin(this.angle);
            
            this.x += this.speedX * this.speedModifier;
            this.y += this.speedY * this.speedModifier;

            this.history.push({x: this.x, y: this.y})
            if (this.history.length > this.maxLength){
                this.history.shift()
            }
        }
        else if (this.history.length > 1){
            this.history.shift()
        }
        else{
            this.reset();
        }

        
    }

    reset(){
        this.x = Math.floor(Math.random() * this.effect.width);
        this.y = Math.floor(Math.random() * this.effect.height);
        this.history = [{x: this.x, y: this.y}]
        this.timer = this.maxLength;
    }

}

class Effect{
    constructor(width, height){
        this.width = width;
        this.height = height;
        this.particles = [];
        this.numberOfParticles = 100;
        this.cellSize = 10;
        this.rows;
        this.cols;
        this.flowField = [];
        this.curve = 5.3;
        this.zoom = 0.04;
        this.init()
    }

    init(width = canvas.width, height = canvas.height){

        this.width = width;
        this.height = height;
        
        this.particles = []

        this.rows = Math.floor(this.height / this.cellSize)
        this.cols = Math.floor(this.width / this.cellSize)
        this.flowField = [];
        
        for (let y = 0; y < this.rows; y++){
            for (let x = 0; x < this.cols; x++){
                let angle = (Math.cos(x * this.zoom) + Math.sin(y * this.zoom)) * this.curve;
                this.flowField.push(angle)
            }
        }

        for (let i = 0; i < this.numberOfParticles; i++){
            this.particles.push(new Particle(this))
        }
    }

    render(context){
        this.particles.forEach(p=>{
            p.draw(context);
            p.update()
        })
    }
}

const effect = new Effect(canvas.width, canvas.height)
effect.init()
effect.render(ctx)

function animate(){
    ctx.clearRect(0,0,canvas.width, canvas.height)
    effect.render(ctx);
    requestAnimationFrame(animate);
}

const curve = document.querySelector('#curve')
const zoom = document.querySelector('#zoom')
const sizeOfCell = document.querySelector('#cell-size')
const noParticles = document.querySelector('#no-particles')
const lineWidth = document.querySelector('#lineWidth')


curve.addEventListener('input', (e)=>{
    effect.curve = e.target.value;
    effect.init()
})

zoom.addEventListener('input', (e)=>{
    effect.zoom = e.target.value;
    effect.init()
})

sizeOfCell.addEventListener('input', (e)=>{
    effect.cellSize = e.target.value;
    effect.init()
})

noParticles.addEventListener('input', (e)=>{
    effect.numberOfParticles = e.target.value;
    effect.init()
})

lineWidth.addEventListener('change', (e)=>{
    ctx.lineWidth = e.target.value;
})


animate()