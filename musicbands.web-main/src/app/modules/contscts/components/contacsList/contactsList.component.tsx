import React from "react";
import {useFacade} from "./contactsList.hooks";
import {LoaderComponent} from "../../../_common/components/loader/loader.component";
import {
    Card,
    CardContent,
    CardHeader,
    List,
    ListItem,
    ListItemIcon,
    ListItemText
} from "@mui/material";
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import {useTranslation} from "react-i18next";
import {EmptyPlaceholderComponent} from "../../../_common/components/emptyPlaceholder/emptyPlaceholder.component";

interface ContactsListComponentProps {
    bandId: string;
}

export const ContactsListComponent: React.FC<ContactsListComponentProps> = (props: ContactsListComponentProps) => {
    const [
        {
            contacts,
            isLoading
        }
    ] = useFacade(props.bandId);

    const {t} = useTranslation();

    if (isLoading) {
        return <LoaderComponent/>
    }

    if (!contacts || !contacts.length) {
        return <EmptyPlaceholderComponent text={t('ContactsListComponent.emptyPlaceholder')}/>
    }

    return (
        <Card>
            <CardHeader title={t('ContactsListComponent.contacts')}/>

            <CardContent>
                <List>
                    {
                        contacts.map((contact, index) => {
                            return (
                                <ListItem key={index}>
                                    <ListItemIcon>
                                        <PermContactCalendarIcon />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={contact.value}
                                        secondary={contact.name}
                                    />
                                </ListItem>
                            )
                        })
                    }
                </List>
            </CardContent>
        </Card>
    );
}