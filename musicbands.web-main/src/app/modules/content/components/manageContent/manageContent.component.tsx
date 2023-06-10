import React from "react";
import {useTranslation} from "react-i18next";
import {LoaderComponent} from "../../../_common/components/loader/loader.component";
import {Box} from "@mui/material";
import {useFacade} from "./manageContent.hooks";
import {UpdateContentComponent} from "../updateContent/updateContent.component";
import {CreateContentComponent} from "../createContent/createContent.component";
import {EmptyPlaceholderComponent} from "../../../_common/components/emptyPlaceholder/emptyPlaceholder.component";

interface ManageContentComponentProps {
    bandId: string;
}

export const ManageContentComponent: React.FC<ManageContentComponentProps> = (props: ManageContentComponentProps) => {
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

    return (
        <Box>
            {
                content.length === 0 &&
                <EmptyPlaceholderComponent text={t('ManageContentComponent.emptyPlaceholder')} />
            }
            {
                content.map((content, index) => {
                    return (
                        <Box mb={2} key={index}>
                            <Box>
                                <UpdateContentComponent content={content}/>
                            </Box>
                        </Box>
                    )
                })
            }
            <Box display="flex" justifyContent="flex-end" p={2}>
                <CreateContentComponent bandId={props.bandId}/>
            </Box>
        </Box>
    );
}