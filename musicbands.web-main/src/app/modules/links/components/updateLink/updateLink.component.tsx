import React from "react";
import {Box, Button, Dialog, DialogContent, DialogTitle, IconButton} from "@mui/material";
import {LinkModel} from "../../models/link.model";
import {useFacade} from "./updateLink.hooks";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import {useTranslation} from "react-i18next";
import {linkTypes} from "../../constants/linkTypes";
import EditIcon from '@mui/icons-material/Edit';

interface UpdateLinkComponentProps {
    link: LinkModel;
}

export const UpdateLinkComponent: React.FC<UpdateLinkComponentProps> = (props: UpdateLinkComponentProps) => {
    const [
        {
            model,
            isOpen,
            hasChanges,
            isLoading
        },
        handleOpen,
        handleClose,
        handleChanges,
        saveChanges,
        discardChanges
    ] = useFacade(props.link);

    const {t} = useTranslation();

    return (
        <Box>
            <IconButton onClick={() => handleOpen()}>
                <EditIcon/>
            </IconButton>
            <Dialog fullWidth maxWidth="sm" open={isOpen} onClose={() => handleClose()}>
                <DialogTitle>{t('CreateLinkComponent.title')}</DialogTitle>
                <DialogContent>
                    <Box component="form" noValidate sx={{mt: 1}}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="name"
                            color="secondary"
                            label={t('UpdateLinkComponent.name')}
                            name="name"
                            value={model.name}
                            onChange={(event) => handleChanges(event.target.name, event.target.value)}
                        />
                        <TextField
                            margin="normal"
                            fullWidth
                            id="description"
                            color="secondary"
                            label={t('UpdateLinkComponent.description')}
                            name="description"
                            value={model.description}
                            onChange={(event) => handleChanges(event.target.name, event.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="value"
                            color="secondary"
                            label={t('UpdateLinkComponent.value')}
                            name="value"
                            value={model.value}
                            onChange={(event) => handleChanges(event.target.name, event.target.value)}
                        />
                        <TextField
                            margin="normal"
                            fullWidth
                            disabled
                            id="type"
                            color="secondary"
                            label={t('UpdateLinkComponent.type')}
                            name="type"
                            value={linkTypes.get(props.link.type)}
                        />
                        <FormControlLabel
                            label={t('UpdateLinkComponent.isPublic').toString()}
                            control={
                                <Checkbox
                                    id="isPublic"
                                    value="remember"
                                    color="secondary"
                                    name="isPublic"
                                    checked={model.isPublic}
                                    onChange={(event) => handleChanges(event.target.name, !model.isPublic)}
                                />
                            }
                        />
                    </Box>
                    <Box mt={3} display="flex" justifyContent="space-between">
                        <Box>
                            <Button color="secondary" disabled={!hasChanges || isLoading} onClick={() => discardChanges()}>
                                {t('UpdateLinkComponent.discard')}
                            </Button>
                        </Box>
                        <Box>
                            <Button color="secondary" variant="outlined" disabled={isLoading} onClick={() => saveChanges()}>
                                {t('UpdateLinkComponent.save')}
                            </Button>
                        </Box>
                    </Box>
                </DialogContent>
            </Dialog>
        </Box>
    );
}