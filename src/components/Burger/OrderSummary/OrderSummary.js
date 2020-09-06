import React, { Fragment } from "react";


const OrderSummary = (props) => {

    return (
        <Fragment>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients</p>
            <ul>
                <li>Salad : {props.ingredients.salad}</li>
                <li>Bacon : {props.ingredients.bacon}</li>
                <li>Cheese : {props.ingredients.cheese}</li>
                <li>Meat : {props.ingredients.meat}</li>
            </ul>
        </Fragment>
    )
};


export default OrderSummary;