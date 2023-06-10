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
import {useFacade} from "./createLink.hooks";
import {linkTypes} from "../../constants/linkTypes";
import {useTranslation} from "react-i18next";
import AddIcon from "@mui/icons-material/Add";

interface CreateLinkComponentProps {
    bandId: string;
}

export const CreateLinkComponent: React.FC<CreateLinkComponentProps> = (props: CreateLinkComponentProps) => {
    const [
        {
            model,
            isOpen,
            isLoading
        },
        handleOpen,
        handleClose,
        handleChanges,
        saveChanges
    ] = useFacade(props.bandId);

    const {t} = useTranslation();

    return (
        <Box>
            <IconButton color="secondary" onClick={() => handleOpen()}>
                <AddIcon/>
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
                            label={t('CreateLinkComponent.name')}
                            name="name"
                            value={model.name}
                            onChange={(event) => handleChanges(event.target.name, event.target.value)}
                        />
                        <TextField
                            margin="normal"
                            fullWidth
                            id="description"
                            color="secondary"
                            label={t('CreateLinkComponent.description')}
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
                            label={t('CreateLinkComponent.value')}
                            name="value"
                            value={model.value}
                            onChange={(event) => handleChanges(event.target.name, event.target.value)}
                        />
                        <FormControl
                            fullWidth
                            margin="normal">
                            <InputLabel>Type</InputLabel>
                            <Select
                                id="type"
                                fullWidth
                                label={t('CreateLinkComponent.type')}
                                value={model.type}
                                color="secondary"
                                name="type"
                                onChange={(event) => handleChanges(event.target.name, event.target.value)}
                            >
                                {
                                    Array.from(linkTypes.keys()).map((linkType, index) => {
                                        return (
                                            <MenuItem key={index} value={linkType}>{linkTypes.get(linkType)}</MenuItem>
                                        )
                                    })
                                }
                            </Select>
                        </FormControl>
                        <FormControlLabel
                            color="secondary"
                            label={t('CreateLinkComponent.isPublic').toString()}
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
                            <Button color="secondary" variant="outlined" disabled={isLoading} onClick={() => saveChanges()}>
                                {t('CreateLinkComponent.create')}
                            </Button>
                        </Box>
                    </Box>
                </DialogContent>
            </Dialog>
        </Box>
    );
}