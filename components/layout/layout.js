import { Fragment } from "react";
import Header from "./mainheader";

function Layout(props) {
    return <Fragment>
        <Header />
        <main>{props.children}</main>
    </Fragment>
}
export default Layout