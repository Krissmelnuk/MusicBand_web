import React from "react";
import {AppBar, Container, Toolbar, Typography} from "@mui/material";

export const FooterComponent: React.FC = () => {
    return (
        <AppBar position="static" color="secondary">
            <Container maxWidth="md">
                <Toolbar>
                    <Typography variant="body1" color="inherit">
                        &copy; 2022 MusicBands
                    </Typography>
                </Toolbar>
            </Container>
        </AppBar>
    );
}