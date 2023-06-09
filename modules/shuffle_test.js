import Deck from './deck.js';
import Entity, { NUM_WEIGHTS } from './entity.js';

const NUM_RANKS = 9;
const NUM_TRIALS = 100000;
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

    static duel(entity1, entity2)
    {
        let output = '';

        const deck = new Deck();

        let entity1_wins = 0;
        let entity2_wins = 0;
        let entity_tie = 0;

        for(let index_trial = 0; index_trial < NUM_TRIALS; index_trial++)
        {
            entity1.dealHand(deck);
            entity2.dealHand(deck);

            if(entity1.hand.hand_rank > entity2.hand.hand_rank)
            {
                entity1_wins++;
            }
            else if(entity1.hand.hand_rank < entity2.hand.hand_rank)
            {
                entity2_wins++;
            }
            else
            {
                entity_tie++;
            }
        }

        output += entity1_wins + ',' + entity2_wins + ',' + entity_tie;

        return output;
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
