import {LinkModel} from "../../models/link.model";
import {Store, StoreConfig} from "@datorama/akita";

/**
 * Represents links state
 */
export interface LinksState {
    links: LinkModel[];
}

/**
 * Creates initial state
 */
export function createInitialState(): LinksState {
    return {
        links: []
    }
}

/**
 * Provides links states management
 */
@StoreConfig({name: 'links', resettable: true})
export class LinksStore extends Store<LinksState> {
    constructor() {
        super(createInitialState())
    }

    public addLink(link: LinkModel): void {
        const links = [...this.getValue().links, link];
        this.update({links: links});
    }

    public updateLink(link: LinkModel): void {
        const links = this.getValue().links.map(x => x.id === link.id ? link : x);
        this.update({links: links});
    }

    public deleteLink(id: string): void {
        const links = this.getValue().links.filter(x => x.id !== id);
        this.update({links: links});
    }
}

export const linksStore = new LinksStore()