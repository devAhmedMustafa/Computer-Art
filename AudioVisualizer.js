const audio = document.querySelector('#audio')
const audioCtx = new AudioContext()

const file = document.querySelector('#fileupload')

const container = document.querySelector('.container')
const canvas = document.querySelector('canvas')
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');

let audioSource;
let analyser;

audio.addEventListener('playing', ()=>{
    
    let bufferLength = analyser.frequencyBinCount;
    let dataArray = new Uint8Array(bufferLength);

    let barWidth = canvas.width/bufferLength;
    let barHeight;
    let x;

    function animate(){
        x=0;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        analyser.getByteFrequencyData(dataArray);
        drawVisualizer(bufferLength, x, barWidth, barHeight, dataArray);
        requestAnimationFrame(animate);
    }
    animate();
})

file.addEventListener('change', function(){
    const files = this.files;
    audio.src = URL.createObjectURL(files[0]);
    audio.load();

    audioSource = audioCtx.createMediaElementSource(audio);
    analyser = audioCtx.createAnalyser();
    audioSource.connect(analyser);
    analyser.connect(audioCtx.destination);
    analyser.fftSize = 2048;
})

function drawVisualizer(bufferLength, x, barWidth, barHeight, dataArray){
    for (let i = 0; i < bufferLength; i++){
        barHeight = dataArray[i] * 1;
        ctx.save();
        ctx.translate(canvas.width/2, canvas.height/2);
        ctx.rotate(i*Math.PI * 10 / bufferLength);
        const hue = i * 1;
        ctx.fillStyle = `hsl(${hue}, 100%, ${barHeight/3}%)`
        ctx.shadowColor = `hsl(${hue}, 100%, ${barHeight/3}%)`
        ctx.shadowBlur = 15

        ctx.fillRect(100, 100, barWidth, barHeight)
        x+=barWidth;
        ctx.restore()
    }
}