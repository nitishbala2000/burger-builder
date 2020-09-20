import React, {Fragment, Component} from "react";
import classes from "./Layout.module.css";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";
import {connect} from "react-redux";
import { nominalTypeHack } from "prop-types";

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
                <Toolbar isAuth={this.props.isAuthenticated} showSideDrawerHandler={this.SideDrawerOpenHandler}/>
                <SideDrawer isAuth={this.props.isAuthenticated} open={this.state.showSideDrawer} closed={this.SideDrawerClosedHandler}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Fragment>
        );
    }
};

const mapStateToProps = state => {
    return {
        isAuthenticated : state.auth.token !== null
    };
};

export default connect(mapStateToProps)(Layout);