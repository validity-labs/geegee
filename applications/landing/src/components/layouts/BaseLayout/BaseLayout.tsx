import { ReactElement, ReactNode } from 'react';

import Footer from '@/components/layouts/Footer/Footer';
import Header from '@/components/layouts/Header/Header';

interface IProps {
  children: ReactNode;
}

export default function BaseLayout(props: IProps): ReactElement {
  const { children } = props;
  return (
    <>
      <Header />
      {/* tabIndex={-1} creates outline on safari, temporarily removed */}
      <main id="main" /* tabIndex={-1} */>{children}</main>
      <Footer />
    </>
  );
}
