import React from "react";
import {Box, Card, CardActions, CardContent, CardHeader, Chip, IconButton, TextField} from "@mui/material";
import {ContentModel} from "../../models/content.model";
import {useFacade} from "./updateContent.hooks";
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import CancelIcon from '@mui/icons-material/Cancel';
import {contentTypeNames} from "../../constants/contentTypeNames";
import {useTranslation} from "react-i18next";

interface UpdateContentComponentProps {
    content: ContentModel;
}

export const UpdateContentComponent: React.FC<UpdateContentComponentProps> = (props: UpdateContentComponentProps) => {
    const {
        content
    } = props;

    const [
        {
            model,
            hasChanges,
            isLoading
        },
        handleChanges,
        handleDiscard,
        handleSave,
        handleDelete
    ] = useFacade(content);

    const {t} = useTranslation();

    return (
        <Card>
            <CardHeader
                title={
                    <Box display="flex" justifyContent="space-between">
                        <Box>
                            {
                                t('ContentListComponent' + '.' + contentTypeNames.get(content.type))
                            }
                        </Box>
                        <Box>
                            <Chip label={content.locale} />
                        </Box>
                    </Box>
            }/>

            <CardContent>
                <Box>
                    <TextField
                        fullWidth
                        multiline
                        rows={10}
                        label="Data"
                        color="secondary"
                        id="data"
                        name="data"
                        value={model.data}
                        onChange={(e) => handleChanges(e.target.name, e.target.value)}
                    />
                </Box>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton disabled={isLoading} onClick={() => handleDelete()}>
                    <DeleteIcon />
                </IconButton>
                <IconButton disabled={!hasChanges || isLoading} onClick={() => handleDiscard()}>
                    <CancelIcon />
                </IconButton>
                <IconButton disabled={!hasChanges || isLoading} onClick={() => handleSave()}>
                    <SaveIcon />
                </IconButton>
            </CardActions>
        </Card>
    )
}