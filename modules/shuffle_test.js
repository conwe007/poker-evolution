import Deck from './deck.js';
import Entity, { NUM_WEIGHTS } from './entity.js';

const NUM_RANKS = 9;
const NUM_TRIALS = 10000;
const HAND_RANK_HIGH_CARD = 0;
const HAND_RANK_PAIR = 1;
const HAND_RANK_TWO_PAIR = 2;
const HAND_RANK_THREE_OF_A_KIND = 3;
const HAND_RANK_STRAIGHT = 4;
const HAND_RANK_FLUSH = 5;
const HAND_RANK_FULL_HOUSE = 6;
const HAND_RANK_FOUR_OF_A_KIND = 7;
const HAND_RANK_STRAIGHT_FLUSH = 8;
const LUT_WEIGHTS = ['c', 'd', 's', 'h', 'A', '2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K'];
const LUT_HAND_RANK = ['high card', 'pair', 'two pair', 'three of a kind', 'straight', 'flush', 'full house', 'four of a kind', 'straight flush'];

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
            this.ranks[index_ranks] /= NUM_TRIALS;
        }
    }

    clear()
    {
        for(let index_ranks = 0; index_ranks < NUM_RANKS; index_ranks++)
        {
            this.ranks[index_ranks] = 0;
        }

        for(let index_weights = 0; index_weights < NUM_WEIGHTS; index_weights++)
        {
            this.entity.weights[index_weights] = 0.5;
        }
    }




    toStringStats()
    {
        let output = '';

        output += LUT_WEIGHTS.toString() + '\n';
        output += this.entity.weights.toString() + '\n';
        output += LUT_HAND_RANK.toString() + '\n';
        output += this.ranks.toString();

        return output;
    }

}
