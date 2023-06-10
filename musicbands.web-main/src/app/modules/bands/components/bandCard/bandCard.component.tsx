import React, {useRef} from "react";
import {BandModel} from "../../models/band.model";
import {Box, Card, CardActions, CardContent, IconButton, Paper, Typography} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import {imagesService} from "../../../images/services/images.service";
import {defaultImageSrc} from "../../../images/constants/defaultImageSrc";

interface BandCardComponentProps {
    band: BandModel;
    handleView: Function;
    handleLike: Function;
}

export const BandCardComponent: React.FC<BandCardComponentProps> = (props: BandCardComponentProps) => {
    const {
        band,
        handleView,
        handleLike
    } = props;

    const ref = useRef(null);

    const image = band.image
        ? imagesService.downloadLink(band.image)
        : defaultImageSrc;

    return (
        <Card ref={ref}>
            <Paper
                elevation={0}
                square={true}
                sx={{
                    background: 'url(' + image + ')',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    backgroundSize: '100% 100%',
                    padding:'50%',
                }}
            >
            </Paper>
            <CardContent sx={{padding: 0}}>
                <Box px={1} pt={1}>
                    <Typography gutterBottom variant="h5" component="div">
                        {band.name}
                    </Typography>
                </Box>
            </CardContent>
            <CardActions disableSpacing sx={{paddingTop: 0, paddingLeft: 1, paddingRight: 1, paddingBottom: 1}}>
                <IconButton color="secondary" onClick={() => handleView(band)}>
                    <RemoveRedEyeIcon/>
                </IconButton>
                {
                    handleLike &&
                    <IconButton size="small" style={{marginLeft: 'auto'}} onClick={() => handleLike(band)}>
                        <FavoriteIcon sx={theme => ({color: theme.palette.error.main})}/>
                    </IconButton>
                }
            </CardActions>
        </Card>
    )
}