
import Burger from "../../Burger/Burger";
import React from "react";
import Button from "../../UI/Button/Button";
import classes from "./CheckoutSummary.module.css";

const CheckoutSummary = (props) => {
    return (
        <div className={classes.CheckoutSummary}>
            <h1>We hope it tastes well!</h1>
            <div style={{width : "100%", margin: "auto"}}>
                <Burger ingredients={props.ingredients}/>
            </div>

            <Button btnType="Danger" clicked={() => alert("Hi")}>CANCEL</Button>
            <Button btnType="Success" clicked={() => alert("Hi")}>CONTINUE</Button>
        </div>
    )
}

export default CheckoutSummary;