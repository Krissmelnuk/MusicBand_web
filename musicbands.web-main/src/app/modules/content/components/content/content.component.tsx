import React from "react";
import {Card, CardContent, CardHeader} from "@mui/material";
import {ContentModel} from "../../models/content.model";
import {contentTypeNames} from "../../constants/contentTypeNames";
import {useTranslation} from "react-i18next";

interface ContentComponentProps {
    content: ContentModel;
}

export const ContentComponent: React.FC<ContentComponentProps> = (props: ContentComponentProps) => {
    const {
        content
    } = props;

    const {t} = useTranslation();

    return (
        <Card>
            <CardHeader title={t('ContentListComponent' + '.' + contentTypeNames.get(content.type))}>

            </CardHeader>
            <CardContent>
                <span style={{whiteSpace: 'pre-line'}}>
                    {content.data}
                </span>
            </CardContent>
        </Card>
    )
}