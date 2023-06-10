import React from "react";
import {Box, Button, Dialog, DialogContent, DialogTitle, IconButton} from "@mui/material";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import {useTranslation} from "react-i18next";
import {ContactModel} from "../../models/contact.model";
import {contactTypes} from "../../constants/contactTypes";
import {useFacade} from "./updateContact.hooks";
import EditIcon from "@mui/icons-material/Edit";

interface UpdateContactComponentProps {
    contact: ContactModel;
}

export const UpdateContactComponent: React.FC<UpdateContactComponentProps> = (props: UpdateContactComponentProps) => {
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
    ] = useFacade(props.contact);

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
                            color="secondary"
                            margin="normal"
                            required
                            fullWidth
                            id="name"
                            label={t('UpdateContactComponent.name')}
                            name="name"
                            value={model.name}
                            onChange={(event) => handleChanges(event.target.name, event.target.value)}
                        />
                        <TextField
                            color="secondary"
                            margin="normal"
                            fullWidth
                            id="description"
                            label={t('UpdateContactComponent.description')}
                            name="description"
                            value={model.description}
                            onChange={(event) => handleChanges(event.target.name, event.target.value)}
                        />
                        <TextField
                            color="secondary"
                            margin="normal"
                            required
                            fullWidth
                            id="value"
                            label={t('UpdateContactComponent.value')}
                            name="value"
                            value={model.value}
                            onChange={(event) => handleChanges(event.target.name, event.target.value)}
                        />
                        <TextField
                            color="secondary"
                            margin="normal"
                            fullWidth
                            disabled
                            id="type"
                            label={t('UpdateContactComponent.type')}
                            name="type"
                            value={contactTypes.get(props.contact.type)}
                        />
                        <FormControlLabel
                            label={t('UpdateContactComponent.isPublic').toString()}
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
                                {t('UpdateContactComponent.discard')}
                            </Button>
                        </Box>
                        <Box>
                            <Button color="secondary" variant="outlined" disabled={isLoading} onClick={() => saveChanges()}>
                                {t('UpdateContactComponent.save')}
                            </Button>
                        </Box>
                    </Box>
                </DialogContent>
            </Dialog>
        </Box>
    );
}