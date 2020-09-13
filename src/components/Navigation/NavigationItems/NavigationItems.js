import React from "react";
import classes from "./NavigationItems.module.css";
import {NavLink} from "react-router-dom";

const NavigationItems = (props) => (
    <ul className={classes.NavigationItems}>

        {/* Change the active class name to match that for CSS modules, which we have defined stylig for */}
        <li><NavLink to="/" exact activeClassName={classes.active}>Burger Builder</NavLink></li>

        <li><NavLink to="/orders" activeClassName={classes.active}>Orders</NavLink></li>
    </ul>
);

export default NavigationItems;