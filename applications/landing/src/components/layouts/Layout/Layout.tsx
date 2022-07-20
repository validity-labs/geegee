import { ReactElement, ReactNode } from 'react';

interface IProps {
  children: ReactNode;
}

export default function Layout(props: IProps): ReactElement {
  const { children } = props;

  return (
    /* tabIndex={-1} creates outline on safari, temporarily removed */
    <main id="main" /* tabIndex={-1} */>{children}</main>
  );
}
