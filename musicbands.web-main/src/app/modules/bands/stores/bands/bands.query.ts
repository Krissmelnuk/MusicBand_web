import { Query } from '@datorama/akita'
import { BandsState, bandsStore, BandsStore } from './bands.store'

/**
 * Provides bands queries
 */
export class BandsQuery extends Query<BandsState> {
    band$ = this.select(state => state.band);
    bands$ = this.select(state => state.bands);
    count$ = this.select(state => state.count);
    myBand$ = this.select(state => state.myBands);
    recentBand$ = this.select(state => state.recentBand);
    popularBand$ = this.select(state => state.popularBands);

    constructor (protected store: BandsStore) {
        super(store)
    }
}

export const bandsQuery = new BandsQuery(bandsStore)
