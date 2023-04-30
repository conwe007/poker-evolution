import Deck from './deck.js';
import Entity from './entity.js';
import Hand from './hand.js';
import {width, height} from '../main.js';
import {NUM_WEIGHTS, DEFAULT_RADIUS_ENTITY} from './entity.js';
import {randomInt} from './utilities.js';

const NUM_ENTITIES = 32;

export default class Population
{
    constructor()
    {
        this.deck = new Deck();
        this.entities = [];
        
        for(let index_entities = 0; index_entities < NUM_ENTITIES; index_entities++)
        {
            this.entities[index_entities] = new Entity(
                null,
                randomInt(0 + DEFAULT_RADIUS_ENTITY, width - DEFAULT_RADIUS_ENTITY),
                randomInt(0 + DEFAULT_RADIUS_ENTITY, height - DEFAULT_RADIUS_ENTITY)
            );
            this.entities[index_entities].dealHand(this.deck);
        }
    }

    // draw each entity
    draw()
    {
        for(let index_entities = 0; index_entities < NUM_ENTITIES; index_entities++)
        {
            this.entities[index_entities].draw();
        }
    }

    // update the position of each entity
    update()
    {
        for(let index_entities = 0; index_entities < NUM_ENTITIES; index_entities++)
        {
            this.entities[index_entities].update();
        }
    }

    // check for collisions and if they happen, reproduce
    reproduce()
    {
        for(let index_primary = 0; index_primary < NUM_ENTITIES - 1; index_primary++)
        {
            for(let index_secondary = index_primary; index_secondary < NUM_ENTITIES; index_secondary++)
            {
                // calculate distances, keep them squared to improve performance (no call to sqrt)
                const distance_x = this.entities[index_secondary].x - this.entities[index_primary].x;
                const distance_y = this.entities[index_secondary].y - this.entities[index_primary].y;
                const distance_squared = (distance_x * distance_x) + (distance_y * distance_y);
                const double_radius_squared = (this.entities[index_primary].radius + this.entities[index_secondary].radius) * (this.entities[index_primary].radius + this.entities[index_secondary].radius);

                // entities are colliding, the more fit entity reproduces
                if(distance_squared < double_radius_squared)
                {
                    console.log(distance_squared);
                    // deal each entity a new hand
                    this.entities[index_primary].dealHand(this.deck);
                    this.entities[index_secondary].dealHand(this.deck);

                    // primary entity wins, reproduce primary and kill secondary
                    if(Hand.betterHand(this.entities[index_primary].hand, this.entities[index_secondary].hand))
                    {
                        const entity_offspring = this.entities[index_primary].reproduce();
                        this.entities[index_secondary] = entity_offspring;
                    }
                    // secondary entity wins, reproduce secondary and kill primary
                    else
                    {
                        const entity_offspring = this.entities[index_secondary].reproduce();
                        this.entities[index_primary] = entity_offspring;
                    }
                }
            }
        }
    }

    // return string of average weight stats for the population
    toStringStats()
    {
        let output = '';
        let mean_weights = [];
        let min_weights = [];
        let max_weights = [];

        // set initial values for weights
        for(let index_weights = 0; index_weights < NUM_WEIGHTS; index_weights++)
        {
            mean_weights[index_weights] = 0.0;
            min_weights[index_weights] = 1.0;
            max_weights[index_weights] = 0.0;
        }

        for(let index_weights = 0; index_weights < NUM_WEIGHTS; index_weights++)
        {
            for(let index_entities = 0; index_entities < NUM_ENTITIES; index_entities++)
            {
                // sum each of the weights of the entire population
                mean_weights[index_weights] += this.entities[index_entities].weights[index_weights];

                if(this.entities[index_entities].weights[index_weights] < min_weights[index_weights])
                {
                    min_weights[index_weights] = this.entities[index_entities].weights[index_weights];
                }

                if(this.entities[index_entities].weights[index_weights] > max_weights[index_weights])
                {
                    max_weights[index_weights] = this.entities[index_entities].weights[index_weights];
                }
            }

            // divide by the total number of entities to get the mean
            mean_weights[index_weights] /= NUM_ENTITIES;
        }

        for(let index_weights = 0; index_weights < NUM_WEIGHTS; index_weights++)
        {
            output += (Math.round(min_weights[index_weights] * 100) / 100) + ',';
        }

        output += '\n';

        for(let index_weights = 0; index_weights < NUM_WEIGHTS; index_weights++)
        {
            output += (Math.round(mean_weights[index_weights] * 100) / 100) + ',';
        }

        output += '\n';

        for(let index_weights = 0; index_weights < NUM_WEIGHTS; index_weights++)
        {
            output += (Math.round(max_weights[index_weights] * 100) / 100) + ',';
        }

        return output;
    }
}
