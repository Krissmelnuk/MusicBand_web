import React from "react";
import {
    Box,
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    FormControl, IconButton,
    InputLabel,
    MenuItem,
    Select
} from "@mui/material";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import {useTranslation} from "react-i18next";
import {useFacade} from "./createContact.hooks";
import {contactTypes} from "../../constants/contactTypes";
import AddIcon from '@mui/icons-material/Add';

interface CreateContactComponentProps {
    bandId: string;
}

export const CreateContactComponent: React.FC<CreateContactComponentProps> = (props: CreateContactComponentProps) => {
    const [
        {
            model,
            isOpen,
            isLoading
        },
        handleOpen,
        handleClose,
        handleChanges,
        handleSave
    ] = useFacade(props.bandId);

    const {t} = useTranslation();

    return (
        <Box>
            <IconButton onClick={() => handleOpen()}>
                <AddIcon/>
            </IconButton>
            <Dialog fullWidth maxWidth="sm" open={isOpen} onClose={() => handleClose()}>
                <DialogTitle>{t('CreateContactComponent.title')}</DialogTitle>
                <DialogContent>
                    <Box component="form" noValidate sx={{mt: 1}}>
                        <TextField
                            margin="normal"
                            color="secondary"
                            required
                            fullWidth
                            id="name"
                            label={t('CreateContactComponent.name')}
                            name="name"
                            value={model.name}
                            onChange={(event) => handleChanges(event.target.name, event.target.value)}
                        />
                        <TextField
                            margin="normal"
                            color="secondary"
                            fullWidth
                            id="description"
                            label={t('CreateContactComponent.description')}
                            name="description"
                            value={model.description}
                            onChange={(event) => handleChanges(event.target.name, event.target.value)}
                        />
                        <TextField
                            margin="normal"
                            color="secondary"
                            required
                            fullWidth
                            id="value"
                            label={t('CreateContactComponent.value')}
                            name="value"
                            value={model.value}
                            onChange={(event) => handleChanges(event.target.name, event.target.value)}
                        />
                        <FormControl
                            fullWidth
                            color="secondary"
                            margin="normal">
                            <InputLabel>Type</InputLabel>
                            <Select
                                id="type"
                                fullWidth
                                label={t('CreateContactComponent.type')}
                                value={model.type}
                                color="secondary"
                                name="type"
                                onChange={(event) => handleChanges(event.target.name, event.target.value)}
                            >
                                {
                                    Array.from(contactTypes.keys()).map((type, index) => {
                                        return (
                                            <MenuItem key={index} value={type}>{contactTypes.get(type)}</MenuItem>
                                        )
                                    })
                                }
                            </Select>
                        </FormControl>
                        <FormControlLabel
                            label={t('CreateContactComponent.isPublic').toString()}
                            control={
                                <Checkbox
                                    id="isPublic"
                                    value={model.isPublic}
                                    color="secondary"
                                    name="isPublic"
                                    checked={Boolean(model.isPublic)}
                                    onChange={(event) => handleChanges(event.target.name, !model.isPublic)}
                                />
                            }
                        />
                    </Box>
                    <Box mt={3} display="flex" justifyContent="flex-end">
                        <Box>
                            <Button color="secondary" variant="outlined" disabled={isLoading} onClick={() => handleSave()}>
                                {t('CreateContactComponent.create')}
                            </Button>
                        </Box>
                    </Box>
                </DialogContent>
            </Dialog>
        </Box>
    );
}