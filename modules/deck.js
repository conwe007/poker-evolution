import Card from './card.js';

const NUM_VALUES = 13;
const NUM_SUITS = 4;
const NUM_CARDS_DECK = 52;

const WEIGHT_VALUE_OFFSET = 4;

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

    shuffleWeighted(weights)
    {
        // calculate each cards weight with a random component
        for(index_cards = 0; index_cards < NUM_CARDS_DECK; index_cards++)
        {
            card = this.cards[index_cards];
            card.weight = Math.random() * weights[card.suit] * weights[WEIGHT_VALUE_OFFSET + card.value];
        }

        // sort the deck by weight
        for(index_primary = 0; index_primary < NUM_CARDS_DECK - 1; index_primary++)
        {
            for(index_secondary = index_primary + 1; index_secondary < NUM_CARDS_DECK; index_secondary++)
            {
                card_temporary = this.cards[index_primary];
                this.cards[index_primary] = this.cards[index_secondary];
                this.cards[index_secondary] = card_temporary;
            }
        }

        this.index_deck = 0;
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
