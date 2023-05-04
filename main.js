import Population from './modules/population.js';
import ShuffleTest from './modules/shuffle_test.js';
import Simulation from './modules/simulation.js';
import Entity from './modules/entity.js';

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

// const shuffle_test = new ShuffleTest();
// shuffle_test.run();
// console.log(shuffle_test.toStringStats());

// shuffle_test.clear();
// shuffle_test.entity.weights[0] = 0.75;
// shuffle_test.entity.weights[1] = 0.25;
// shuffle_test.entity.weights[2] = 0.25;
// shuffle_test.entity.weights[3] = 0.25;
// shuffle_test.run();
// console.log(shuffle_test.toStringStats());

// shuffle_test.clear();
// shuffle_test.entity.weights[7] = 0.75;
// shuffle_test.entity.weights[9] = 0.25;
// shuffle_test.entity.weights[10] = 0.25;
// shuffle_test.entity.weights[11] = 0.25;
// shuffle_test.run();
// console.log(shuffle_test.toStringStats());
// shuffle_test.clear();

// const simulation = new Simulation()
// simulation.run(100000);

const entity1 = new Entity();
const entity2 = new Entity();

// entity1.weights[0] = 0.75;
// entity1.weights[1] = 0.25;
// entity1.weights[2] = 0.25;
// entity1.weights[3] = 0.25;
entity1.weights[4] = 0.95
entity1.weights[5] = 0.05;
entity1.weights[6] = 0.05;
entity1.weights[7] = 0.05;
entity1.weights[8] = 0.05;
entity1.weights[9] = 0.05;
entity1.weights[10] = 0.05;
entity1.weights[11] = 0.05;
entity1.weights[12] = 0.05;
entity1.weights[13] = 0.05;
entity1.weights[14] = 0.05;
entity1.weights[15] = 0.05;
entity1.weights[16] = 0.05;

console.log(entity1.toString());
console.log(entity2.toString());
console.log(ShuffleTest.duel(entity1, entity2));

export {ctx, width, height};
