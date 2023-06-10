import React from "react";
import {LoaderComponent} from "../../../_common/components/loader/loader.component";
import {Box, IconButton, List, ListItem, ListItemIcon, ListItemText, Paper} from "@mui/material";
import {useFacade} from "./manageContacts.hooks";
import {CreateContactComponent} from "../createContact/createContact.component";
import {UpdateContactComponent} from "../updateContact/updateContact.component";
import PermContactCalendarIcon from "@mui/icons-material/PermContactCalendar";
import {EmptyPlaceholderComponent} from "../../../_common/components/emptyPlaceholder/emptyPlaceholder.component";
import DeleteIcon from "@mui/icons-material/Delete";
import {useTranslation} from "react-i18next";

interface ManageContactsComponentProps {
    bandId: string;
}

export const ManageContactsComponent: React.FC<ManageContactsComponentProps> = (props: ManageContactsComponentProps) => {
    const [
        {
            contacts,
            isLoading
        },
        handleDelete
    ] = useFacade(props.bandId);

    const {t} = useTranslation();

    if (isLoading) {
        return <LoaderComponent/>
    }

    return (
        <Box>
            {
                contacts.length === 0 &&
                <EmptyPlaceholderComponent text={t('ManageContactsComponent.emptyPlaceholder')}/>
            }
            {
                contacts.length > 0 &&
                <List>
                    {
                        contacts.map((contact, index) => {
                            return (
                                <Box mb={1}>
                                    <Paper>
                                        <ListItem key={index}>
                                            <ListItemIcon>
                                                <PermContactCalendarIcon />
                                            </ListItemIcon>
                                            <ListItemText
                                                primary={contact.value}
                                                secondary={contact.name}
                                            />
                                            <IconButton onClick={() => handleDelete(contact)}>
                                                <DeleteIcon/>
                                            </IconButton>
                                            <UpdateContactComponent contact={contact}/>
                                        </ListItem>
                                    </Paper>
                                </Box>
                            )
                        })
                    }
                </List>
            }
            <Box mt={2} display="flex" justifyContent="center">
                <CreateContactComponent bandId={props.bandId}/>
            </Box>
        </Box>
    )
}