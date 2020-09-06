import React, {Fragment, Component} from "react";
import classes from "./Layout.module.css";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";

class Layout extends Component {

    state = {
        showSideDrawer: false
    }


    SideDrawerClosedHandler = () => {
        this.setState({showSideDrawer: false});
    }

    SideDrawerOpenHandler = () => {

        this.setState((prevState) => {
            return {showSideDrawer : !prevState.showSideDrawer}
        });
        
    }

    render() {

        return (
            <Fragment>
                <Toolbar showSideDrawerHandler={this.SideDrawerOpenHandler}/>
                <SideDrawer open={this.state.showSideDrawer} closed={this.SideDrawerClosedHandler}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Fragment>
        );
    }
};

export default Layout;