import {Card} from './card.js';

const NUM_VALUES = 13;
const NUM_SUITS = 4;
const NUM_CARDS_DECK = 52;

export default class Deck
{
    constructor()
    {
        let cards = [];
        let index_deck = 0;

        for(suit = 0; suit < NUM_SUITS; suit++)
        {
            for(value = 0; value < NUM_VALUES; value++)
            {
                this.cards[suit * NUM_VALUES + value] = Card(value, suit);
            }
        }
    }

    shuffleWeighted()
    {
        
    }

    deal()
    {
        return this.cards[index_deck++];
    }

    toString()
    {
        let output = '';

        for(suit = 0; suit < NUM_SUITS; suit++)
        {
            for(value = 0; value < NUM_VALUES; value++)
            {
                output += this.cards[suit * NUM_VALUES + value].toString() + ' ';
            }
        }

        return output;
    }
}
