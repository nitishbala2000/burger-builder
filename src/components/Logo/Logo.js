import React from "react";
import classes from "./Logo.module.css";

//This is how to include images
//Webpack will move everything around
import burgerLogo from "../../assets/images/burger-logo.png";

const Logo = (props) => (
    <div className={classes.Logo}>
        <img src={burgerLogo} alt="MyBurger"></img>
    </div>
);

export default Logo;