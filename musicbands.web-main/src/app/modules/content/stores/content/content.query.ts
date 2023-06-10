import { Query } from '@datorama/akita'
import {ContentState, contentStore, ContentStore} from "./content.store";

/**
 * Provides content queries
 */
export class ContentQuery extends Query<ContentState> {
    content$ = this.select(state => state.content);

    constructor (protected store: ContentStore) {
        super(store)
    }
}

export const contentQuery = new ContentQuery(contentStore)
