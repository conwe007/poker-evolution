const lut_value = ['A', '2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K'];
const lut_suit = ['c', 'd', 's', 'h'];

export default class Card
{
    constructor()
    {
        this.value = -1;
        this.suit = -1;
        this.weight = 0;
    }

    constructor(value, suit)
    {
        this.value = value;
        this.suit = suit;
        this.weight = 0;
    }

    toString()
    {
        return lut_value[this.value] + lut_suit[this.suit];
    }
}
