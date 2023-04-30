import Deck from './modules/deck.js';
import Entity from './modules/entity.js';
import {DEFAULT_RADIUS_ENTITY} from './modules/entity.js';
import {randomInt, randomRGB} from './utilities.js';

// setup canvas
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

const entities = [];

for(let index_entities = 0; index_entities < 25; index_entities++)
{
    entities[index_entities] = new Entity(
        null,
        randomInt(0 + DEFAULT_RADIUS_ENTITY, width - DEFAULT_RADIUS_ENTITY),
        randomInt(0 + DEFAULT_RADIUS_ENTITY, height - DEFAULT_RADIUS_ENTITY)
    );
}

function loop()
{
    ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
    ctx.fillRect(0, 0, width, height);

    for(const entity of entities)
    {
        entity.draw();
        entity.update();
    }

    

    requestAnimationFrame(loop);
}

loop();

export {ctx, width, height};
