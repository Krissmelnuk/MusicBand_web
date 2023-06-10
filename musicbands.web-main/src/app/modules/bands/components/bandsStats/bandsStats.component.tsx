import React from "react";
import {useFacade} from "./bandsStats.hooks";
import {Box, Paper, Typography} from "@mui/material";
import {LoaderComponent} from "../../../_common/components/loader/loader.component";
import {useTranslation} from "react-i18next";

export const BandStatsComponent: React.FC = () => {
    const [
        {
            isLoading,
            count
        }
    ] = useFacade();

    const {t} = useTranslation();

    return (
        <Paper>
            <Box p={5}>
                {
                    isLoading
                        ? <LoaderComponent/>
                        : <Typography gutterBottom variant="h4" component="div">
                            {t('BandStatsComponent.bandsCount')}: {count}
                        </Typography>
                }
            </Box>
        </Paper>
    )
}