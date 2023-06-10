import React from "react";
import {LoaderComponent} from "../../../_common/components/loader/loader.component";
import {useFacade} from "./linksList.hooks";
import {
    Card, CardContent,
    CardHeader,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText
} from "@mui/material";
import {useTranslation} from "react-i18next";
import {EmptyPlaceholderComponent} from "../../../_common/components/emptyPlaceholder/emptyPlaceholder.component";
import {linkIcons} from "../../constants/linkIcons";

interface LinksListComponentProps {
    bandId: string;
}

export const LinksListComponent: React.FC<LinksListComponentProps> = (props: LinksListComponentProps) => {
    const [
        {
            links,
            isLoading
        },
        handleOpenLink
    ] = useFacade(props.bandId);

    const {t} = useTranslation();

    if (isLoading) {
        return <LoaderComponent/>
    }

    if (!links || !links.length) {
        return <EmptyPlaceholderComponent text={t('LinksListComponent.emptyPlaceholder')}/>
    }

    return (
        <Card>
            <CardHeader title={t('LinksListComponent.links')}/>

            <CardContent>
                <List disablePadding>
                    {
                        links.map((link, index) => {
                            return (
                                <ListItem key={index} disablePadding>
                                    <ListItemButton onClick={() => handleOpenLink(link)}>
                                        <ListItemIcon>
                                            {
                                                linkIcons.get(link.type)
                                            }
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={link.value.substring(0, 25) + '...'}
                                            secondary={link.name}
                                        />
                                    </ListItemButton>
                                </ListItem>
                            )
                        })
                    }
                </List>
            </CardContent>
        </Card>
    );
}