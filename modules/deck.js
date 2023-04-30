import Card from './card.js';

const NUM_VALUES = 13;
const NUM_SUITS = 4;
const NUM_CARDS_DECK = 52;

const WEIGHT_VALUE_OFFSET = 4;

export default class Deck
{
    constructor()
    {
        this.cards = [];
        this.index_deck = 0;

        for(let suit = 0; suit < NUM_SUITS; suit++)
        {
            for(let value = 0; value < NUM_VALUES; value++)
            {
                this.cards[suit * NUM_VALUES + value] = new Card(value, suit);
            }
        }
    }

    shuffleWeighted(weights)
    {
        // calculate each cards weight with a random component
        for(let index_cards = 0; index_cards < NUM_CARDS_DECK; index_cards++)
        {
            this.cards[index_cards].weight = Math.random() * weights[this.cards[index_cards].suit] * weights[WEIGHT_VALUE_OFFSET + this.cards[index_cards].value];
            console.log(this.cards[index_cards].toString() + ' ' + this.cards[index_cards].weight);
        }

        // sort the deck by weight
        for(let index_primary = 0; index_primary < NUM_CARDS_DECK - 1; index_primary++)
        {
            for(let index_secondary = index_primary + 1; index_secondary < NUM_CARDS_DECK; index_secondary++)
            {
                if(this.cards[index_primary].weight > this.cards[index_secondary].weight)
                {
                    let card_temporary = this.cards[index_primary];
                    this.cards[index_primary] = this.cards[index_secondary];
                    this.cards[index_secondary] = card_temporary;
                }
            }
        }

        this.index_deck = 0;
    }

    deal()
    {
        return this.cards[this.index_deck++];
    }

    toString()
    {
        let output = '';

        for(let suit = 0; suit < NUM_SUITS; suit++)
        {
            for(let value = 0; value < NUM_VALUES; value++)
            {
                output += this.cards[suit * NUM_VALUES + value].toString() + ' ';
            }

            output += '\n';
        }

        return output;
    }
}
