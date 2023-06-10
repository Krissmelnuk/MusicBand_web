import React from "react";
import {Box, Card, CardContent, Typography} from "@mui/material";

interface EmptyPlaceholderComponentProps {
    text: string;
}

export const EmptyPlaceholderComponent: React.FC<EmptyPlaceholderComponentProps> = (props: EmptyPlaceholderComponentProps) => {

    return (
        <Card>
            <CardContent>
                <Box py={10} textAlign="center">
                    <Typography gutterBottom variant="h5" component="div">
                        {props.text}
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    )
}