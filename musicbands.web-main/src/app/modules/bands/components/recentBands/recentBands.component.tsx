import React from "react";
import {useFacade} from "./recentBands.hooks";
import {LoaderComponent} from "../../../_common/components/loader/loader.component";
import {BandsListComponent} from "../bandsList/bandsList.component";
import {Box, Typography} from "@mui/material";
import {useTranslation} from "react-i18next";

interface RecentBandsComponentProps {
    amount: number;
}

export const RecentBandsComponent: React.FC<RecentBandsComponentProps> = (props: RecentBandsComponentProps) => {
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
                    {t('RecentBandsComponent.title')}
                </Typography>
            </Box>
            <Box mt={2}>
                <BandsListComponent
                    bands={bands}
                    handleView={handleView}
                    handleLike={handleLike}
                    handleAction={handleViewMore}
                    actionTitle={t('RecentBandsComponent.viewMore')}
                />
            </Box>
        </Box>
    )
}