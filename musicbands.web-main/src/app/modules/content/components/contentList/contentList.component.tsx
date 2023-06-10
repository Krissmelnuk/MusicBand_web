import React from "react";
import {LoaderComponent} from "../../../_common/components/loader/loader.component";
import {Box} from "@mui/material";
import {useTranslation} from "react-i18next";
import {EmptyPlaceholderComponent} from "../../../_common/components/emptyPlaceholder/emptyPlaceholder.component";
import {useFacade} from "./contentList.hooks";
import {ContentComponent} from "../content/content.component";

interface ContentListComponentProps {
    bandId: string;
}

export const ContentListComponent: React.FC<ContentListComponentProps> = (props: ContentListComponentProps) => {
    const [
        {
            content,
            isLoading
        }
    ] = useFacade(props.bandId);

    const {t} = useTranslation();

    if (isLoading) {
        return <LoaderComponent/>
    }

    if (!content || !content.length) {
        return <EmptyPlaceholderComponent text={t('ContentListComponent.emptyPlaceholder')}/>
    }

    return (
        <Box>
            {
                content.map((contentModel, index) => {
                    return (
                        <Box mb={index + 1 != content.length ? 2 : 0} key={index}>
                            <ContentComponent content={contentModel}/>
                        </Box>
                    )
                })
            }
        </Box>
    );
}