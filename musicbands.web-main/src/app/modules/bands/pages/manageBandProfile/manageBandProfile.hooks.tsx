import React, {useEffect, useState} from 'react'
import {BandModel} from "../../models/band.model";
import {Subscription} from "rxjs";
import {onEmit} from "../../../_common/helpers/onEmit";
import {bandsQuery} from "../../stores/bands";
import {bandsService} from "../../services/bands.service";
import {ILoadingState} from "../../../_common/states/loadingState";
import {MenuItemModel} from "../../../_common/models/menuItem.model";
import {UpdateBandComponent} from "../../components/updateBand/updateBand.component";
import {ManageLinksComponent} from "../../../links/components/manageLinks/manageLinks.component";
import {ManageContactsComponent} from "../../../contscts/components/manageContacts/manageContacts.component";
import {ManageContentComponent} from "../../../content/components/manageContent/manageContent.component";
import PeopleIcon from '@mui/icons-material/People';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import CropOriginalIcon from '@mui/icons-material/CropOriginal';
import {ManageImagesComponent} from "../../../images/components/manageImages/manageImages.component";
import {BandSettingsComponent} from "../../components/bandSettings/bandSettings.component";
import TuneIcon from '@mui/icons-material/Tune';

export enum BandProfileMode {
    edit,
    view
}

enum Sections {
    Profile = 1,
    Content = 2,
    Links = 3,
    Contacts = 4,
    Images = 5,
    Settings = 6
}

interface ManageBandProfilePageState extends ILoadingState {
    currentSection: Sections;
    band: BandModel;
    mode: BandProfileMode
}

export function useFacade(id: string): [
    ManageBandProfilePageState,
    MenuItemModel[],
    Map<Sections, JSX.Element>,
    Function
] {
    const [state, setState] = useState({
        isLoading: true,
        currentSection: Sections.Profile,
        mode: BandProfileMode.edit,
        band: null
    } as ManageBandProfilePageState);

    const menuItems: MenuItemModel[] = [
        {
            type: Sections.Profile as number,
            name: 'ManageBandProfilePage.menu.profile',
            icon: <PeopleIcon/>,
            action: () => {setState(state => ({...state, currentSection: Sections.Profile}))}
        },
        {
            type: Sections.Content as number,
            name: 'ManageBandProfilePage.menu.content',
            icon: <ContentCopyIcon/>,
            action: () => {setState(state => ({...state, currentSection: Sections.Content}))}
        },
        {
            type: Sections.Links as number,
            name: 'ManageBandProfilePage.menu.links',
            icon: <InsertLinkIcon/>,
            action: () => {setState(state => ({...state, currentSection: Sections.Links}))}
        },
        {
            type: Sections.Contacts as number,
            name: 'ManageBandProfilePage.menu.contacts',
            icon: <PermContactCalendarIcon/>,
            action: () => {setState(state => ({...state, currentSection: Sections.Contacts}))}
        },
        {
            type: Sections.Images as number,
            name: 'ManageBandProfilePage.menu.images',
            icon: <CropOriginalIcon/>,
            action: () => {setState(state => ({...state, currentSection: Sections.Images}))}
        },
        {
            type: Sections.Settings as number,
            name: 'ManageBandProfilePage.menu.settings',
            icon: <TuneIcon/>,
            action: () => {setState(state => ({...state, currentSection: Sections.Settings}))}
        }
    ];

    const sections: Map<Sections, JSX.Element> = new Map<Sections, JSX.Element>()
        .set(Sections.Profile, <UpdateBandComponent band={state.band}/>)
        .set(Sections.Content, <ManageContentComponent bandId={id}/>)
        .set(Sections.Links, <ManageLinksComponent bandId={id}/>)
        .set(Sections.Contacts, <ManageContactsComponent bandId={id}/>)
        .set(Sections.Images, <ManageImagesComponent band={state.band}/>)
        .set(Sections.Settings, <BandSettingsComponent band={state.band}/>);

    const handleModeChanges = (isChecked: boolean) => {
        setState(state => ({
            ...state,
            mode: isChecked ? BandProfileMode.view : BandProfileMode.edit
        }));
    }

    useEffect(() => {
        const subscriptions: Subscription[] = [
            onEmit<BandModel>(bandsQuery.band$, band => {
                setState(state => ({
                    ...state,
                    band: band
                }));
            }),
        ];

        bandsService.getBandById(id).subscribe({
            next: () => setState(state => ({
                ...state,
                isLoading: false
            })),
            error: () => setState(state => ({
                ...state,
                isLoading: false
            }))
        });

        return () => {
            subscriptions.map(it => it.unsubscribe())
        };
    }, [id]);

    return [
        state,
        menuItems,
        sections,
        handleModeChanges]
}
