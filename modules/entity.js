import Deck from './deck.js';
import Hand from './hand.js';

const NUM_WEIGHTS = 17;
const NUM_CARDS_HAND = 5;

const WEIGHT_VALUE_OFFSET = 4;

const MUTATION_CHANCE = 0.05;
const MUTATION_MAGNITUDE = 0.01;

export default class Entity
{
    constructor(weights)
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
    }

    dealHand(deck)
    {
        deck.shuffleWeighted(this.weights);

        for(let index_hand = 0; index_hand < NUM_CARDS_HAND; index_hand++)
        {
            this.hand.cards[index_hand] = deck.deal();
        }

        this.hand.evaluate();
    }

    reproduce()
    {
        let offspring = new Entity(this.weights);

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
