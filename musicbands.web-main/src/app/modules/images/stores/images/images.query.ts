import {Query} from '@datorama/akita'
import {ImagesState, imagesStore, ImagesStore} from "./images.store";
import {ImageType} from "../../enums/image.type";

/**
 * Provides images queries
 */
export class ImagesQuery extends Query<ImagesState> {
    images$ = this.select(state => state.images);
    profileImage$ = this.select(state => state.images.find(x => x.type === ImageType.Profile));
    galleryImages$ = this.select(state => state.images.filter(x => x.type === ImageType.Gallery));

    constructor (protected store: ImagesStore) {
        super(store)
    }
}

export const imagesQuery = new ImagesQuery(imagesStore)
