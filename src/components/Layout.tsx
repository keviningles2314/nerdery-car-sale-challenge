import { PropsWithChildren } from 'react';
import Navbar from './Navbar/Navbar';

interface LayoutProps {
  children: PropsWithChildren;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

export default Layout;
