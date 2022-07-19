import * as React from 'react';

import { useTranslation } from 'next-i18next';

import { NextSeo, NextSeoProps } from 'next-seo';

export type I18nPageNamespace = 'root' | 'about' | 'service' | 'error';

interface Props extends NextSeoProps {
  ns?: I18nPageNamespace;
  title?: string;
  description?: string;
}

export default function Seo({ ns, title, description, ...restOfProps }: Props) {
  const {
    t,
    i18n: { language },
  } = useTranslation();
  // const { defaultOGImage } = useApp();

  let newTitle = title;
  let newDescription = description;
  if (ns) {
    newTitle = t('page.title', 'MISSING_SEO', { ns });
    newDescription = t('page.description', 'MISSING_SEO', { ns });
  }

  const siteTitle = t('app.name', { ns: 'common' });
  const metaTitle = `${newTitle} | ${siteTitle}`;
  const metaDescription = newDescription || t('app.description', { ns: 'common' });
  const { openGraph, ...restOfNextSeoProps } = restOfProps;

  const openGraphImages = [
    {
      url: '/images/share.jpg',
      width: 1200,
      height: 630,
      alt: siteTitle,
    },
  ];

  return (
    <NextSeo
      title={metaTitle}
      description={metaDescription}
      openGraph={{
        title: metaTitle,
        description: metaDescription,
        site_name: siteTitle,
        locale: language,
        images: openGraphImages,
        ...openGraph,
      }}
      {...restOfNextSeoProps}
    />
  );
}
