import React, {useState} from "react";
import {Box, Button, Card, Grid, TextField} from "@mui/material";
import {useTranslation} from "react-i18next";

interface BandsSearchBarComponentProps {
    handleSearch: Function;
}

export const BandsSearchBarComponent: React.FC<BandsSearchBarComponentProps> = (props: BandsSearchBarComponentProps) => {
    const handleSearch = props.handleSearch;
    const [searchQuery, setSearchQuery] = useState('');
    const {t} = useTranslation();

    return (
        <Card>
            <Grid container>
                <Grid item sm={10}>
                    <Box p={1}>
                        <TextField
                            size="small"
                            fullWidth
                            variant="outlined"
                            color="secondary"
                            value={searchQuery}
                            onChange={(e) => {
                                setSearchQuery(e.target.value)
                            }}
                        />
                    </Box>
                </Grid>
                <Grid item sm={2}>
                    <Box p={1}>
                        <Button sx={{height: 40}} variant="outlined" color="secondary" fullWidth onClick={() => handleSearch(searchQuery)}>
                            {t('BandsSearchBarComponent.search')}
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </Card>
    )
}