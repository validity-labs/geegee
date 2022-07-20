/* eslint-disable jsx-a11y/anchor-has-content */
import * as React from 'react';

import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import { useRouter } from 'next/router';

import { Link as MuiLink, LinkProps as MuiLinkProps } from '@mui/material';
import clsx from 'clsx';

interface NextLinkComposedProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>,
    Omit<NextLinkProps, 'href' | 'as'> {
  to: NextLinkProps['href'];
  linkAs?: NextLinkProps['as'];
  href?: NextLinkProps['href'];
}

export const NextLinkComposed = React.forwardRef<HTMLAnchorElement, NextLinkComposedProps>(function NextLinkComposed(
  props,
  ref,
) {
  // eslint-disable-next-line no-unused-vars
  const { to, linkAs, href, replace, scroll, passHref, shallow, prefetch, locale, ...other } = props;

  // if (href) {
  //   console.log(href);
  // }

  return (
    <NextLink
      href={to}
      prefetch={prefetch}
      as={linkAs}
      replace={replace}
      scroll={scroll}
      shallow={shallow}
      passHref={passHref}
      locale={locale}
    >
      <a ref={ref} {...other} />
    </NextLink>
  );
});

export type LinkProps = {
  activeClassName?: string;
  as?: NextLinkProps['as'];
  href: NextLinkProps['href'];
  noLinkStyle?: boolean;
} & Omit<NextLinkComposedProps, 'to' | 'linkAs' | 'href'> &
  Omit<MuiLinkProps, 'href'>;

// A styled version of the Next.js Link component:
// https://nextjs.org/docs/#with-link
const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(function Link(props, ref) {
  const {
    activeClassName = 'active',
    as: linkAs,
    className: classNameProps,
    href,
    noLinkStyle,
    // eslint-disable-next-line no-unused-vars
    role, // Link don't have roles.
    ...other
  } = props;

  // if (role) {
  //   console.log(role);
  // }

  const router = useRouter();
  const pathname = typeof href === 'string' ? href : href.pathname;
  const className = clsx(classNameProps, {
    [activeClassName]: router.pathname === pathname && activeClassName,
  });

  const isExternal = typeof href === 'string' && (href.indexOf('http') === 0 || href.indexOf('mailto:') === 0);

  if (isExternal) {
    if (noLinkStyle) {
      return (
        <a className={className} href={href as string} ref={ref as any} target="_blank" rel="noreferrer" {...other} />
      );
    }

    return (
      <MuiLink className={className} href={href as string} ref={ref} target="_blank" rel="noreferrer" {...other} />
    );
  }

  if (noLinkStyle) {
    return <NextLinkComposed className={className} ref={ref as any} to={href} {...other} />;
  }

  return <MuiLink component={NextLinkComposed} linkAs={linkAs} className={className} ref={ref} to={href} {...other} />;
});

export default Link;
