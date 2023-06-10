import React from "react";
import {LoaderComponent} from "../../../_common/components/loader/loader.component";
import {BandsListComponent} from "../bandsList/bandsList.component";
import {useFacade} from "./popularBands.hooks";
import {Box, Typography} from "@mui/material";
import {useTranslation} from "react-i18next";

interface PopularBandsComponentProps {
    amount: number;
}

export const PopularBandsComponent: React.FC<PopularBandsComponentProps> = (props: PopularBandsComponentProps) => {
    const [
        {
            isLoading,
            bands
        },
        handleView,
        handleLike,
        handleViewMore
    ] = useFacade(props.amount);

    const {t} = useTranslation();

    if (isLoading) {
        return <LoaderComponent/>
    }

    return (
        <Box>
            <Box>
                <Typography gutterBottom variant="h5" component="div">
                    {t('PopularBandsComponent.title')}
                </Typography>
            </Box>
            <Box mt={2}>
                <BandsListComponent
                    bands={bands}
                    handleLike={handleLike}
                    handleView={handleView}
                    handleAction={handleViewMore}
                    actionTitle={t('PopularBandsComponent.viewMore')}
                />
            </Box>
        </Box>
    )
}