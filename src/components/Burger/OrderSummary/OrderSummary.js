import React, { Fragment } from "react";
import Button from "../../UI/Button/Button";


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

            <p><strong>Total price: £{props.price.toFixed(2)}</strong></p>

            <Button btnType="Danger" clicked={props.purchaseCancelled}>CANCEL</Button>
            <Button btnType="Success" clicked={props.purchaseContinued}>CONTINUE</Button>


        </Fragment>
    )
};


export default OrderSummary;