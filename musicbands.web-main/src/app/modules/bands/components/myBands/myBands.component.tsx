import React from "react";
import {LoaderComponent} from "../../../_common/components/loader/loader.component";
import {BandsListComponent} from "../bandsList/bandsList.component";
import {Box, IconButton, Typography} from "@mui/material";
import {useTranslation} from "react-i18next";
import {useFacade} from "./myBands.hooks";
import AddIcon from '@mui/icons-material/Add';

export const MyBandsComponent: React.FC = () => {
    const [
        {
            isLoading,
            bands
        },
        handleView,
        handleCreate
    ] = useFacade();

    const {t} = useTranslation();

    if (isLoading) {
        return <LoaderComponent/>
    }

    return (
        <Box>
            <Box>
                <Typography gutterBottom variant="h5" component="div">
                    {t('MyBandsComponent.title')}
                </Typography>
            </Box>
            <Box mt={2}>
                <BandsListComponent
                    bands={bands}
                    handleView={handleView}
                    handleLike={null}
                    handleAction={null}
                    actionTitle={null}
                />
            </Box>
            <Box py={5} display="flex" justifyContent="flex-end">
                <IconButton
                    sx={theme => ({
                        background: theme.palette.primary.contrastText,
                        color: theme.palette.primary.main,
                    })}
                    size="large"
                    onClick={() => handleCreate()}
                >
                    <AddIcon sx={{width: '75px', height: '75px'}}/>
                </IconButton>
            </Box>
        </Box>
    )
}