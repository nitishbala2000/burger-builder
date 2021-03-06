import React, { Fragment } from "react";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import classes from "./SideDrawer.module.css";
import Backdrop from "../../UI/Backdrop/Backdrop";

const SideDrawer = (props) => {

    let attachedClasses = [classes.SideDrawer, classes.Close];
    if (props.open) {
        attachedClasses = [classes.SideDrawer, classes.Open];
    }


    return (
        <Fragment>

            <Backdrop show={props.open} clicked={props.closed}/>

            <div className={attachedClasses.join(" ")}>

                <div style={{height: "11%", marginBottom:"32px"}}>
                    <Logo/>
                </div>
                
                <nav>
                    <NavigationItems isAuthenticated={props.isAuth}/>
                </nav>

            </div>
        </Fragment>
    )

}


export default SideDrawer;