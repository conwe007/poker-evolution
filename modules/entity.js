import Deck from './deck.js';
import Hand from './hand.js';

const NUM_WEIGHTS = 17;
const NUM_CARDS_HAND = 5;

const WEIGHT_VALUE_OFFSET = 4;

export default class Entity
{
    constructor()
    {
        this.weights = [];
        this.hand = new Hand();

        for(let index_weights = 0; index_weights < NUM_WEIGHTS; index_weights++)
        {
            this.weights[index_weights] = 0.5;
        }
    }

    dealHand(deck)
    {
        deck.shuffleWeighted(weights);

        for(index_hand = 0; index_hand < NUM_CARDS_HAND; index_hand++)
        {
            this.hand.cards[index_hand] = deck.deal();
        }

        this.hand.evaluate();
    }

    toString()
    {
        let output = '';

        for(let index_weights = 0; index_weights < NUM_WEIGHTS; index_weights++)
        {
            output += this.weights[index_weights] + ',';
        }

        output += '\n';

        for(let index_hand = 0; index_hand < NUM_CARDS_HAND; index_hand++)
        {
            output += this.hand[index_hand].toString() + ',';
        }

        output += '\n';

        output += this.hand.hand_rank;

        return output;
    }
}
