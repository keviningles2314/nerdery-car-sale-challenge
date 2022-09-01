import { PropsWithChildren } from 'react';

interface LayoutProps {
  children: PropsWithChildren;
}
const Layout = ({ children }: LayoutProps) => {
  return <>{children}</>;
};

export default Layout;
