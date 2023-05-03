import Hand from './hand.js';
import {ctx, width, height} from '../main.js';
import {randomInt, randomRGB} from './utilities.js';

const NUM_WEIGHTS = 17;
const NUM_CARDS_HAND = 5;

const MUTATION_CHANCE = 0.1;
const MUTATION_MAGNITUDE = 0.01;

const VEL_X_MIN = -7;
const VEL_X_MAX = 7;
const VEL_Y_MIN = -7;
const VEL_Y_MAX = 7;

const DEFAULT_RADIUS_ENTITY = 10;

export default class Entity
{
    constructor(weights, x, y)
    {
        this.weights = [];
        this.hand = new Hand();

        if(weights == null)
        {
            for(let index_weights = 0; index_weights < NUM_WEIGHTS; index_weights++)
            {
                this.weights[index_weights] = 0.5;
            }
        }
        else
        {
            this.weights = weights;
        }

        this.x = randomInt(0 + DEFAULT_RADIUS_ENTITY, width - DEFAULT_RADIUS_ENTITY);
        this.y = randomInt(0 + DEFAULT_RADIUS_ENTITY, height - DEFAULT_RADIUS_ENTITY);
        this.vel_x = randomInt(VEL_X_MIN, VEL_X_MAX);
        this.vel_y = randomInt(VEL_Y_MIN, VEL_Y_MAX);
        this.color = randomRGB();
        this.radius = DEFAULT_RADIUS_ENTITY;
    }

    // shuffles the deck and deals 5 cards into entity's hand
    dealHand(deck)
    {
        deck.shuffleWeighted(this.weights);

        for(let index_hand = 0; index_hand < NUM_CARDS_HAND; index_hand++)
        {
            this.hand.cards[index_hand] = deck.deal();
        }

        this.hand.evaluate();
    }

    // creates a new entity based on current entity's weights and mutates the new entity
    reproduce()
    {
        console.log('here');
        const offspring = new Entity(
            this.weights,
            randomInt(0 + DEFAULT_RADIUS_ENTITY, width - DEFAULT_RADIUS_ENTITY),
            randomInt(0 + DEFAULT_RADIUS_ENTITY, height - DEFAULT_RADIUS_ENTITY)
        );

        // loop through each weight and possibly mutate
        for(let index_weights = 0; index_weights < NUM_WEIGHTS; index_weights++)
        {
            // each weight has MUTATION_CHANCE chance of mutating
            if(Math.random() < MUTATION_CHANCE)
            {
                // 50/50 chance of either mutating up or down
                if(Math.random() < 0.5)
                {
                    offspring.weights[index_weights] -= MUTATION_MAGNITUDE;

                    // clamp at 0
                    if(offspring.weights[index_weights] < 0)
                    {
                        offspring.weights[index_weights] = 0;
                    }
                }
                else
                {
                    offspring.weights[index_weights] += MUTATION_MAGNITUDE;

                    // clamp at 1
                    if(offspring.weights[index_weights] > 1)
                    {
                        offspring.weights[index_weights] = 1;
                    }
                }
            }
        }

        return offspring;
    }

    // draw the entity to the screen
    draw()
    {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fill();
    }

    // update the position of the entity
    update() 
    {
        // bounce off of the walls
        if((this.x + this.radius) >= width)
        {
            this.vel_x = -(this.vel_x);
        }

        if((this.x - this.radius) <= 0)
        {
            this.vel_x = -(this.vel_x);
        }

        if((this.y + this.radius) >= height)
        {
            this.vel_y = -(this.vel_y);
        }

        if((this.y - this.radius) <= 0)
        {
            this.vel_y = -(this.vel_y);
        }

        this.x += this.vel_x;
        this.y += this.vel_y;
    }

    // returns string with weights, hand, and hand rank
    toString()
    {
        let output = '';

        for(let index_weights = 0; index_weights < NUM_WEIGHTS; index_weights++)
        {
            output += this.weights[index_weights] + ',';
        }

        output += '\n';

        output += this.hand.toString();

        output += '\n';

        output += this.hand.hand_rank;

        return output;
    }
}

export {DEFAULT_RADIUS_ENTITY, NUM_WEIGHTS};
