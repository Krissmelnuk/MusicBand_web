import React from "react";
import {LoaderComponent} from "../../../_common/components/loader/loader.component";
import {Box, IconButton, List, ListItem, ListItemIcon, ListItemText, Paper} from "@mui/material";
import {useFacade} from "./manageLinks.hooks";
import {UpdateLinkComponent} from "../updateLink/updateLink.component";
import {CreateLinkComponent} from "../createLink/createLink.component";
import LinkIcon from "@mui/icons-material/Link";
import {EmptyPlaceholderComponent} from "../../../_common/components/emptyPlaceholder/emptyPlaceholder.component";
import DeleteIcon from '@mui/icons-material/Delete';
import {useTranslation} from "react-i18next";

interface ManageLinksComponentProps {
    bandId: string;
}

export const ManageLinksComponent: React.FC<ManageLinksComponentProps> = (props: ManageLinksComponentProps) => {
    const [
        {
            links,
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
                links.length === 0 &&
                <EmptyPlaceholderComponent text={t('ManageLinksComponent.emptyPlaceholder')}/>
            }
            {
                links.length > 0 &&
                <List>
                    {
                        links.map((link, index) => {
                            return (
                                <Box mb={1}>
                                    <Paper key={index}>
                                        <ListItem>
                                            <ListItemIcon>
                                                <LinkIcon/>
                                            </ListItemIcon>
                                            <ListItemText
                                                primary={link.value.substring(0, 25) + '...'}
                                                secondary={link.name}
                                            />
                                            <IconButton onClick={() => handleDelete(link)}>
                                                <DeleteIcon/>
                                            </IconButton>
                                            <UpdateLinkComponent link={link}/>
                                        </ListItem>
                                    </Paper>
                                </Box>
                            )
                        })
                    }
                </List>
            }
            <Box mt={2} display="flex" justifyContent="center">
                <CreateLinkComponent bandId={props.bandId}/>
            </Box>
        </Box>
    )
}