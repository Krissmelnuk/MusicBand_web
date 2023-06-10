import {createTheme} from "@mui/material";

const defaultTheme = createTheme({
    palette: {
        primary: {
            light: '#dcfff3',
            main: '#95DDCF',
            dark: '#6fb6a5',
            contrastText: '#393939'
        },
        secondary: {
            light: '#646464',
            main: '#313131',
            dark: '#000000',
            contrastText: '#95DDCF'
        },
        error: {
            light: '#ff8a8a',
            main: '#ff8a8a',
            dark: '#ff8a8a',
            contrastText: '#313131'
        },
        common: {
            black: '#393939',
            white: '#FFFFFF'
        },
        background: {
            default: '#F3F2F1',
            paper: '#FFFFFF'
        },
        text: {
            primary: "#393939",
            secondary: "#393939"
        }
    }
});

export default defaultTheme;