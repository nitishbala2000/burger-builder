import React from "react";
import classes from "./NavigationItems.module.css";
import {NavLink} from "react-router-dom";

const NavigationItems = (props) => (
    <ul className={classes.NavigationItems}>

        <li><NavLink to="/" exact activeClassName={classes.active}>Burger Builder</NavLink></li>

        {props.isAuthenticated ? 
            <li><NavLink to="/orders" activeClassName={classes.active}>Orders</NavLink></li> : null}

        {!props.isAuthenticated ? 
            <li><NavLink to="/auth" activeClassName={classes.active}>Log in</NavLink></li>
            : <li><NavLink to="/logout" activeClassName={classes.active}>Log out</NavLink></li>}
    </ul>
);

export default NavigationItems;