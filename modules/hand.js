import Card from './card.js';
import Deck from './deck.js';

const NUM_CARDS_HAND = 5;
const NUM_VALUES = 13;
const NUM_SUITS = 4;

const HAND_RANK_ERROR = -1;
const HAND_RANK_HIGH_CARD = 0;
const HAND_RANK_PAIR = 1;
const HAND_RANK_TWO_PAIR = 2;
const HAND_RANK_THREE_OF_A_KIND = 3;
const HAND_RANK_STRAIGHT = 4;
const HAND_RANK_FLUSH = 5;
const HAND_RANK_FULL_HOUSE = 6;
const HAND_RANK_FOUR_OF_A_KIND = 7;
const HAND_RANK_STRAIGHT_FLUSH = 8;

const CARD_ERROR = -1;
const CARD_VALUE_ACE = 0;
const CARD_VALUE_TEN = 9;
const CARD_VALUE_JACK = 10;
const CARD_VALUE_QUEEN = 11;
const CARD_VALUE_KING = 12;

export default class Hand
{
    constructor()
    {
        this.cards = [];
        this.hand_rank = HAND_RANK_ERROR;

        for(let index_cards = 0; index_cards < NUM_CARDS_HAND; index_cards++)
        {
            this.cards[index_cards] = new Card(CARD_ERROR, CARD_ERROR);
        }
    }

    // sorts hand, then evaluates and returns hand rank
    evaluate()
    {
        this.sort();
        this.hand_rank = this.handRank();

        return this.hand_rank;
    }

    // sorts cards from smallet to largest
    sort()
    {
        for(let index_primary = 0; index_primary < NUM_CARDS_HAND - 1; index_primary++)
        {
            for(let index_secondary = index_primary; index_secondary < NUM_CARDS_HAND; index_secondary++)
            {
                if(this.cards[index_primary].value > this.cards[index_secondary].value)
                {
                    let temp = this.cards[index_primary];
                    this.cards[index_primary] = this.cards[index_secondary];
                    this.cards[index_secondary] = temp;
                }
            }
        }
    }

    // evaluates and returns hand rank
    handRank()
    {
        // check for flush
        if(this.isFlush())
        {
            // check for straight flush
            if(this.isStraight())
            {
                return HAND_RANK_STRAIGHT_FLUSH;
            }

            return HAND_RANK_FLUSH;
        }

        let counter = [];
        let pairs = 0;
        let triples = 0;

        for(let index_counter = 0; index_counter < NUM_VALUES; index_counter++)
        {
            counter[index_counter] = 0;
        }

        // count the number of each value card in the hand
        for(let index_counter = 0; index_counter < NUM_CARDS_HAND; index_counter++)
        {
            counter[this.cards[index_counter].value]++;
        }

        // check for four of a kind, three of a kind, and pairs
        for(let index_counter = 0; index_counter < NUM_VALUES; index_counter++)
        {
            if(counter[index_counter] == 4)
            {
                return HAND_RANK_FOUR_OF_A_KIND;
            }
            else if(counter[index_counter] == 3)
            {
                triples++;
            }
            else if(counter[index_counter] == 2)
            {
                pairs++;
            }
        }

        // check for full house
        if(triples == 1 && pairs == 1)
        {
            return HAND_RANK_FULL_HOUSE;
        }

        // check for three of a kind
        if(triples == 1 && pairs == 0)
        {
            return HAND_RANK_THREE_OF_A_KIND;
        }

        // check for two pair
        if(pairs == 2)
        {
            return HAND_RANK_TWO_PAIR;
        }

        // check for pair
        if(pairs == 1)
        {
            return HAND_RANK_PAIR;
        }

        // no better hand rank found, must be high card
        return HAND_RANK_HIGH_CARD;
    }

    // returns true if hand is flush, false otherwise
    isFlush()
    {
        if((this.cards[0].suit == this.cards[1].suit) &&
            (this.cards[0].suit == this.cards[2].suit) &&
            (this.cards[0].suit == this.cards[3].suit) &&
            (this.cards[0].suit == this.cards[4].suit))
        {
            return true;
        }

        return false;
    }

    // returns true if hand is straight, false otherwise
    isStraight()
    {
        // check for ace high straight
        if((this.cards[0].value == CARD_VALUE_ACE) &&
            (this.cards[1].value == CARD_VALUE_TEN) &&
            (this.cards[2].value == CARD_VALUE_JACK) &&
            (this.cards[3].value == CARD_VALUE_QUEEN) &&
            (this.cards[4].value == CARD_VALUE_KING))
        {
            return true;
        }

        // check for generic straight
        for(let index_cards = 0; index_cards < NUM_CARDS_HAND - 1; index_cards++)
        {
            if(this.cards[index_cards].value != (this.cards[index_cards + 1].value + 1))
            {
                return false;
            }
        }

        return true;
    }

    toString()
    {
        let output = '';

        for(let index_cards = 0; index_cards < NUM_CARDS_HAND; index_cards++)
        {
            output += this.cards[index_cards].toString() + ',';
        }

        return output;
    }
}
