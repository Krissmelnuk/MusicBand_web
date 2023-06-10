import React from "react";
import {LinkType} from "../enums/linkType";
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import LinkIcon from '@mui/icons-material/Link';

export const linkIcons = new Map<LinkType, JSX.Element>()
    .set(LinkType.Instagram, <InstagramIcon/>)
    .set(LinkType.Twitter, <TwitterIcon/>)
    .set(LinkType.Facebook, <FacebookIcon/>)
    .set(LinkType.YouTube, <YouTubeIcon/>)
    .set(LinkType.LinkedIn, <LinkedInIcon/>)
    .set(LinkType.Other, <LinkIcon/>)