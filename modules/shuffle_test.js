import Deck from './deck.js';
import Entity from './entity.js';

const NUM_RANKS = 9;
const NUM_TRIALS = 10000;

export default class ShuffleTest
{
    constructor()
    {
        this.deck = new Deck();
        this.entity = new Entity();
        this.ranks = [];

        for(let index_ranks = 0; index_ranks < NUM_RANKS; index_ranks++)
        {
            this.ranks[index_ranks] = 0;
        }
    }

    run()
    {
        for(let index_trial = 0; index_trial < NUM_TRIALS; index_trial++)
        {
            this.entity.dealHand(this.deck);
            this.ranks[this.entity.hand.hand_rank]++;
        }

        for(let index_ranks = 0; index_ranks < NUM_RANKS; index_ranks++)
        {
            this.ranks[index_ranks] /= NUM_RANKS;
        }
    }

    clear()
    {
        for(let index_ranks = 0; index_ranks < NUM_RANKS; index_ranks++)
        {
            this.ranks[index_ranks] = 0;
        }
    }




    toStringStats()
    {
        let output = '';

        output += this.entity.weights.toString() + '\n';
        output += this.ranks.toString();

        return output;
    }

}
