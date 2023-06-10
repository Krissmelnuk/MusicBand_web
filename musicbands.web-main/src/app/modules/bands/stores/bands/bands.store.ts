import { Store, StoreConfig } from '@datorama/akita'
import { BandModel } from '../../models/band.model'

/**
 * Represents bands state
 */
export interface BandsState {
    band: BandModel;
    bands: BandModel[];
    count: number | null;
    myBands: BandModel[];
    recentBand: BandModel[];
    popularBands: BandModel[];
}

/**
 * Creates initial state
 */
export function createInitialState (): BandsState {
    return {
        band: null,
        bands: [],
        count: null,
        myBands: [],
        recentBand: [],
        popularBands: []
    }
}

/**
 * Provides bands states management
 */
@StoreConfig({ name: 'bands', resettable: true })
export class BandsStore extends Store<BandsState> {
    constructor () {
        super(createInitialState())
    }

    public updateBand(band: BandModel): void {
        const currentBand = this.getValue().band;

        if (currentBand?.id !== band.id) {
            return;
        }

        this.update({
            band: band
        });
    }
}

export const bandsStore = new BandsStore()
