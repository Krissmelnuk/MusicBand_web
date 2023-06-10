import { Query } from '@datorama/akita'
import {LinksState, linksStore, LinksStore} from "./links.store";

/**
 * Provides links queries
 */
export class LinksQuery extends Query<LinksState> {
    links$ = this.select(state => state.links);

    constructor (protected store: LinksStore) {
        super(store)
    }
}

export const linksQuery = new LinksQuery(linksStore)
