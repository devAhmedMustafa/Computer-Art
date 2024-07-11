const canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const w = canvas.width;
const h = canvas.height;

const ctx = canvas.getContext('2d');

const wave = {
    y: h/2,
    length: 0.01,
    amplitude: 100,
    f: 0.01,
    shift: 0
}

console.log(wave.y)

let increament = wave.f;

function animate(){

    requestAnimationFrame(animate)

    ctx.fillStyle = `rgba(12,12,12, 0.01)`
    ctx.fillRect(0,0,w,h)

    ctx.beginPath()

    ctx.moveTo(0, h/2);

    for (let i = 0; i < w; i++){

        let shift;

        switch(wave.shift){
            case 0: shift = 1;break;
            case 1: shift = 1/Math.sin(i * wave.length); break;
            case 2: shift = 1/Math.cos(increament); break;
            case 3: shift = 1/i * 100; break;
            case 4: shift = Math.sin(increament); break;
            case 5: shift = Math.exp(i*wave.length); break
            case 6: shift = Math.tan(i*wave.length); break
            case 7: shift = Math.cos(Math.sin(i*wave.length)); break
            case 8: shift = Math.asin(Math.cos(i*wave.length*2)); break
            case 9: shift = Math.sin(Math.cos(Math.sin(i*wave.length*10))); break
            
            default: shift = 0;break;
        }

        ctx.lineTo(i, wave.y + Math.sin(i * wave.length + increament) * wave.amplitude * shift)
    }

    increament += wave.f;

    ctx.lineWidth = 0.8
    ctx.strokeStyle = `hsl(${Math.sin(increament)*120+40}, 100%, 50%)`
    ctx.stroke()

}

const lengthControl = document.querySelector('#length')
const amplitudeControl = document.querySelector('#amplitude')
const startControl = document.querySelector('#start-point')
const shiftControl = document.querySelector('#shift')

startControl.max = h;
startControl.value = h/2;

lengthControl.addEventListener('input', (e)=>{
    wave.length = e.target.value
})

amplitudeControl.addEventListener('input', (e)=>{
    wave.amplitude = e.target.value
})

startControl.addEventListener('input', (e)=>{
    wave.y = parseInt(e.target.value)
})

shiftControl.addEventListener('input', (e)=>{
    wave.shift = parseInt(e.target.value)
})

animate()

