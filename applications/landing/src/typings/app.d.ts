import React from 'react';

import { SvgIconProps } from '@mui/material';
import { NextConfig } from 'next';
export interface NextAppConfig extends NextConfig {
  serverRuntimeConfig?: {};
  publicRuntimeConfig: {
    baseDomain: string;
    matomoSiteId: string;
    matomoBaseUrl: string;
    matomoTrackerUrl: string;
    matomoSrcUrl: string;
    auth0BaseUrl: string;
  };
}
export type HeaderColorSchema = 'light' | 'dark';
export interface HeaderConfigProps {
  colorSchema?: HeaderColorSchema;
  // withBackground?: boolean;
  // contactHref: string;
}

// export interface FooterConfigProps {
// }

export interface ConfigProps {
  header?: HeaderConfigProps;
  // footer?: FooterConfigProps;
}

export type ID = string;
export type URL = string;
// type Date = string;
export type URLString = string;
export type SetState<A> = React.Dispatch<React.SetStateAction<A>>;

export type Language = 'en' /* | 'de' */;

export interface Account {
  meta?: any;
  balance: number | null;
  isBalanceLoading: boolean;
  isOnline: boolean;
  isOffline: boolean;
  isLoading: boolean;
  isError: boolean;
}

export interface MenuItemLink {
  type: 'internal' | 'external';
  key: string;
  url: string;
  Icon?: React.FC<SvgIconProps>;
}

export interface MenuItemGroup {
  type: 'group';
  key: string;
  items: MenuItemLink[];
}

export type MenuItemType = MenuItemLink | MenuItemGroup;

export interface Product {
  // id: ID;
  url?: string;
  title: string;
  excerpt: string;
  imageURL: string;
  buttonText: string;
}

export interface ExternalImage {
  url: URL;
  caption: string;
  alt: string;
  mime?: string;
  svg?: string | null;
}

// interface Localizations {
//   id: string;
//   slug: string;
//   locale: Language;
// }
// export type SlidersResponse = [{ title: string; slides: { slide: MediaSlide }[] }];

export interface Quote {
  id: ID;
  quote: string;
  name: string;
  position: string;
  portrait: ExternalImage;
  thumbnail: ExternalImage;
}

export interface IOgImage {
  url: string;
  alt: string;
  caption: string;
}

export interface Settings {
  contactHref: string;
  // expertHref: string;
  defaultOGImage: IOgImage | null;
}

export interface TeamInfo {
  id: ID;
  name: string;
  title: string;
  bio: string;
  description: string;
  linkedin?: URL;
  portrait: ExternalImage;
}

export type TeamGallery = ExternalImage[];

export interface StaticImageData {
  src: string;
  height: number;
  width: number;
  blurDataURL?: string;
}

export interface FAQGroup<T = string> {
  key: T;
  count: number;
}
