import React, { MutableRefObject, useMemo, useRef } from 'react';

import { useTranslation } from 'next-i18next';

import { UseTranslationOptions } from 'react-i18next';

import { I18nPageNamespace } from '@/components/layouts/Seo/Seo';
import { ConfigProps, /* FooterConfigProps, */ HeaderConfigProps, Language /* , Settings */ } from '@/typings/app';
export type TranslatedRoutes = Record<Language, string>;
type TranslatedRoutesMaybe = TranslatedRoutes | undefined;

interface AppContextValues {
  ns: I18nPageNamespace;
  // defaultOGImage?: string | null;
  // contactHref: string;
  header: HeaderConfigProps;
  // footer: FooterConfigProps;
  translatedRoutes: MutableRefObject<TranslatedRoutesMaybe>;
}

interface AppContextInterface extends AppContextValues {
  // setTranslatedRoutes: SetState<TranslatedRoutesMaybe>;
}
interface AppProviderProps {
  children: React.ReactNode;
  value: {
    ns: I18nPageNamespace;
    // common: Settings;
    config?: ConfigProps;
  };
}

// const defaultState = {
//   translatedRoutes: undefined,
// };
const AppContext = React.createContext<AppContextInterface>({} as AppContextInterface);

const AppProvider = ({ children, value: { ns, /* common, */ config } }: AppProviderProps) => {
  const translatedRoutes = useRef<TranslatedRoutesMaybe>(undefined);
  const ctx = useMemo(
    () => ({
      ns,
      // defaultOGImage: common.defaultOGImage?.url,
      // contactHref: common.contactHref,
      header: config?.header || {},
      // footer: config?.footer || {},
      translatedRoutes,
      // setTranslatedRoutes,
    }),
    [translatedRoutes, /* common, */ ns, config /* , setTranslatedRoutes */],
  );

  return <AppContext.Provider value={ctx}>{children}</AppContext.Provider>;
};

function useApp() {
  return React.useContext(AppContext);
}

function usePageTranslation(options?: UseTranslationOptions<string>) {
  const { ns } = React.useContext(AppContext);
  const { t } = useTranslation(ns, options);

  return t;
}

export { AppProvider, useApp, usePageTranslation };
