import Population from './modules/population.js';
import ShuffleTest from './modules/shuffle_test.js';

// setup canvas
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

const population = new Population();
let counter = 0;

function loop()
{
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

    requestAnimationFrame(loop);
}

//loop();

const shuffle_test = new ShuffleTest();
shuffle_test.run();
console.log(shuffle_test.toStringStats());

shuffle_test.clear();
shuffle_test.entity.weights[0] = 0.75;
shuffle_test.entity.weights[1] = 0.25;
shuffle_test.entity.weights[2] = 0.25;
shuffle_test.entity.weights[3] = 0.25;
shuffle_test.run();
console.log(shuffle_test.toStringStats());
shuffle_test.clear();

export {ctx, width, height};
