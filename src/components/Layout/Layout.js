import { Fragment } from "react";
import MainNavigation from "./MainNavigation";

const Layout = (props) => {
  return (
    <Fragment>
        <MainNavigation showCart={props.showCart}/>
      <main>{props.children}</main>
    </Fragment>
  );
};

export default Layout;
