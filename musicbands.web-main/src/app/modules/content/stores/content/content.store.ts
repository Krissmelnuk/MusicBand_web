import {Store, StoreConfig} from "@datorama/akita";
import {ContentModel} from "../../models/content.model";

/**
 * Represents content state
 */
export interface ContentState {
    content: ContentModel[];
}

/**
 * Creates initial state
 */
export function createInitialState(): ContentState {
    return {
        content: []
    }
}

/**
 * Provides content state management
 */
@StoreConfig({name: 'content', resettable: true})
export class ContentStore extends Store<ContentState> {
    constructor() {
        super(createInitialState())
    }

    public addContent(model: ContentModel): void {
        const content = [...this.getValue().content, model];
        this.update({content: content});
    }

    public updateContent(model: ContentModel): void {
        const content = this.getValue().content.map(x => x.id === model.id ? model : x);
        this.update({content: content});
    }

    public deleteContent(id: string): void {
        const content = this.getValue().content.filter(x => x.id !== id);
        this.update({content: content});
    }
}

export const contentStore = new ContentStore()