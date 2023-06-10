import React from "react";
import {useTranslation} from "react-i18next";
import {LoaderComponent} from "../../../_common/components/loader/loader.component";
import {EmptyPlaceholderComponent} from "../../../_common/components/emptyPlaceholder/emptyPlaceholder.component";
import {
    Card,
    CardContent,
    CardHeader,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText, Typography
} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import {useFacade} from "./membersList.hooks";
import {imagesService} from "../../../images/services/images.service";
import {memberRoles} from "../../constants/memberRoles";

interface MembersListComponentProps {
    bandId: string;
}

export const MembersListComponent: React.FC<MembersListComponentProps> = (props: MembersListComponentProps) => {
    const [
        {
            members,
            isLoading
        }
    ] = useFacade(props.bandId);

    const {t} = useTranslation();

    if (isLoading) {
        return <LoaderComponent/>
    }

    if (!members || !members.length) {
        return <EmptyPlaceholderComponent text={t('MembersListComponent.emptyPlaceholder')}/>
    }

    return (
        <Card>
            <CardHeader title={t('MembersListComponent.members')}/>

            <CardContent>
                <List disablePadding>
                    {
                        members.map((member, index) => {
                            return (
                                <>
                                    <ListItem alignItems="flex-start">
                                        <ListItemAvatar>
                                            <Avatar alt="Remy Sharp" src={imagesService.downloadLink(member.avatar)} />
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={member.name}
                                            secondary={
                                                <React.Fragment>
                                                    <Typography
                                                        sx={{ display: 'inline' }}
                                                        component="span"
                                                        variant="body2"
                                                        color="text.primary"
                                                    >
                                                        {t(memberRoles.get(member.role))}
                                                    </Typography>
                                                </React.Fragment>
                                            }
                                        />
                                    </ListItem>
                                    {
                                        members.length - 1 > index &&
                                        <Divider variant="inset" component="li" />
                                    }
                                </>
                            )
                        })
                    }
                </List>
            </CardContent>
        </Card>
    );
}