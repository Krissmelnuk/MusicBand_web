import {Store, StoreConfig} from "@datorama/akita";
import {ImageModel} from "../../models/image.model";
import {uniqueImageTypes} from "../../constants/uniqueImageTypes";

/**
 * Represents images state
 */
export interface ImagesState {
    images: ImageModel[];
}

/**
 * Creates initial state
 */
export function createInitialState(): ImagesState {
    return {
        images: []
    }
}

/**
 * Provides images states management
 */
@StoreConfig({name: 'images', resettable: true})
export class ImagesStore extends Store<ImagesState> {

    constructor() {
        super(createInitialState())
    }

    public addImage(image: ImageModel): void {
        if (uniqueImageTypes.includes(image.type)) {
            const existingImage = this.getValue().images.find(x => x.type === image.type);
            if (existingImage) {
                this.deleteImage(existingImage.id);
            }
        }

        const images = [...this.getValue().images, image];
        this.update({images: images});
    }

    public updateImage(image: ImageModel): void {
        const images = this.getValue().images.map(x => x.id === image.id ? image : x);
        this.update({images: images});
    }

    public deleteImage(id: string): void {
        const images = this.getValue().images.filter(x => x.id !== id);
        this.update({images: images});
    }
}

export const imagesStore = new ImagesStore()