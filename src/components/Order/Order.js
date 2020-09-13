
import React, {Component} from "react";
import classes from "./Order.module.css";

const Order = (props) => {


    const ingredientOutput = [];
    for (let ingredientName in props.ingredients) {
        ingredientOutput.push(<li>{ingredientName} ({props.ingredients[ingredientName]})</li>)
    }

    return (
        <div className={classes.Order}>
            <p>Ingredients:</p>
            <ul>
                {ingredientOutput}
            </ul>

            <p>Price: <strong>£{Number.parseFloat(props.price).toFixed(2)}</strong></p>
        </div>
    );
};

export default Order;