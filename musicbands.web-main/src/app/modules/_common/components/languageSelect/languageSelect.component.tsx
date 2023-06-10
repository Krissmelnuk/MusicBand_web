import React from "react";
import {Box, MenuItem, Select} from "@mui/material";
import {useFacade} from "./languageSelect.hooks";
import {locales} from "../../constants/locales";

export const LanguageSelectComponent: React.FC = () => {
    const [
        language,
        handleLanguageSelect
    ] = useFacade();

    return (
        <Box sx={{ padding: 1}}>
            <Select
                size="small"
                variant="outlined"
                value={language}
                label="Language"
                style={{
                    width: '100px',
                    color: 'inherit',
                }}
                onChange={(e) => handleLanguageSelect(e.target.value)}
            >
                {
                    Array.from(locales.keys()).map((locale, index) => {
                        return (
                            <MenuItem sx={{width: '100px'}} key={index} value={locale}>
                                {locales.get(locale)}
                            </MenuItem>
                        )
                    })
                }
            </Select>
        </Box>
    )
}