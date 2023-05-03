import Population from './population.js';

const COUNTER_MAX = 100;

export default class Simulation
{
    constructor()
    {
        this.population = new Population();
    }

    run(trials)
    {
        let counter = 0;
        let generation  = 0;

        if(trials == 0)
        {
            while(1)
            {
                this.population.reproduceSim();
                counter++;
                generation++;

                if(counter > COUNTER_MAX)
                {
                    counter = 0;
                    console.log(generation);
                    console.log(this.population.toStringStats());
                }
            }
        }
        else
        {
            for(let index_trial = 0; index_trial < trials; index_trial++)
            {
                this.population.reproduceSim();
                counter++;
                generation++;
                console.log(generation);

                if(counter > COUNTER_MAX)
                {
                    counter = 0;
                    //console.log(generation);
                    //onsole.log(this.population.toStringStats());
                }
            }
        }
    }
}
