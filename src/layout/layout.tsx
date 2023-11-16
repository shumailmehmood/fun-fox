import React, { ReactNode } from "react";
import Nav from "../components/Nav/Nav";
interface childrenProp {
  children: ReactNode;
}
const Layout: React.FC<childrenProp> = ({ children }) => {
  return (
    <>
      <Nav />
      <main>{children}</main>
    </>
  );
};

export default Layout;
