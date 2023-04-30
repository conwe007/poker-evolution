import Population from './modules/population.js';

// setup canvas
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

let timer = 0;
const TIME_FRAME = 16;

const population = new Population();
let counter = 0;

function loop()
{
    timer = Date.now();

    ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
    ctx.fillRect(0, 0, width, height);

    population.draw();
    population.update();
    population.reproduce();

    counter++;
    if(counter > 1000)
    {
        console.log(population.toStringStats());
        counter = 0;
    }

    while(Date.now() < timer + TIME_FRAME);
    requestAnimationFrame(loop);
}

loop();

export {ctx, width, height};
