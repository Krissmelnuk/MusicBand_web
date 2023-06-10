import {useFacade} from "./snackBar.hooks";
import MuiAlert from '@mui/material/Alert';
import React from "react";
import {Snackbar} from "@mui/material";

export const SnackBarComponent: React.FC = () => {
    const [
        {
            isOpen,
            message
        }
    ] = useFacade();

    return (
        <Snackbar
            open={isOpen}
            style={{zIndex: 3000}}
            anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
        >
            <MuiAlert elevation={6} variant="filled" severity={message?.type}>
                <ul>
                    {
                        message?.messages?.map((message, index) => {
                            return <li key={index}>{message}</li>
                        })
                    }
                </ul>
            </MuiAlert>
        </Snackbar>
    )
}