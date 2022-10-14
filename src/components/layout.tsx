import { PropsWithChildren } from "react"
import Navbar from "./navbar/navbar"

interface LayoutProps {
  children: PropsWithChildren
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  )
}

export default Layout
