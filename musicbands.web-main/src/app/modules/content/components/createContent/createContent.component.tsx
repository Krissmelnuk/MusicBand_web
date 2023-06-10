import React from "react";
import {
    Box,
    Button,
    DialogActions,
    TextField,
    Dialog, DialogTitle, DialogContent, InputLabel, Select, MenuItem, FormControl, IconButton
} from "@mui/material";
import {useFacade} from "./createContent.hooks";
import {useTranslation} from "react-i18next";
import {contentTypeNames} from "../../constants/contentTypeNames";
import {locales} from "../../../_common/constants/locales";
import AddIcon from "@mui/icons-material/Add";

interface CreateContentComponentProps {
    bandId: string;
}

export const CreateContentComponent: React.FC<CreateContentComponentProps> = (props: CreateContentComponentProps) => {
    const {
        bandId
    } = props;

    const [
        {
            model,
            isOpen,
            isLoading
        },
        handleChanges,
        handleClose,
        handleOpen,
        handleSave,
    ] = useFacade(bandId);

    const {t} = useTranslation();

    return (
        <div>
            <IconButton color="secondary" onClick={() => handleOpen()}>
                <AddIcon/>
            </IconButton>
            <Dialog fullWidth maxWidth="sm" open={isOpen} onClose={() => handleClose()}>
                <DialogTitle>{t('CreateContentComponent.title')}</DialogTitle>
                <DialogContent>
                    <Box>
                        <FormControl
                            fullWidth
                            color="secondary"
                            margin="normal">
                            <InputLabel>{t('CreateContentComponent.type')}</InputLabel>
                            <Select
                                id="type"
                                fullWidth
                                label={t('CreateContentComponent.type')}
                                value={model.type}
                                color="secondary"
                                name="type"
                                onChange={(event) => handleChanges(event.target.name, event.target.value)}
                            >
                                {
                                    Array.from(contentTypeNames.keys()).map((type, index) => {
                                        return (
                                            <MenuItem key={index} value={type}>{contentTypeNames.get(type)}</MenuItem>
                                        )
                                    })
                                }
                            </Select>
                        </FormControl>

                        <FormControl
                            fullWidth
                            color="secondary"
                            margin="normal">
                            <InputLabel>{t('CreateContentComponent.locale')}</InputLabel>
                            <Select
                                id="locale"
                                fullWidth
                                label={t('CreateContentComponent.locale')}
                                value={model.locale}
                                color="secondary"
                                name="locale"
                                onChange={(event) => handleChanges(event.target.name, event.target.value)}
                            >
                                {
                                    Array.from(locales.keys()).map((locale, index) => {
                                        return (
                                            <MenuItem key={index} value={locale}>{locales.get(locale)}</MenuItem>
                                        )
                                    })
                                }
                            </Select>
                        </FormControl>

                        <TextField
                            sx={{mt: 2}}
                            fullWidth
                            multiline
                            rows={10}
                            color="secondary"
                            label={t('CreateContentComponent.data')}
                            id="data"
                            name="data"
                            value={model.data}
                            onChange={(e) => handleChanges(e.target.name, e.target.value)}
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button color="secondary" disabled={isLoading} onClick={() => handleClose()}>{t('CreateContentComponent.close')}</Button>
                    <Button  color="secondary" variant="outlined" disabled={isLoading} onClick={() => handleSave()}>{t('CreateContentComponent.save')}</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}