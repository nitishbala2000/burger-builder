import React, { Component, Fragment } from "react";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

class BurgerBuilder extends Component {


    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: true,
        purchasing: false,
        loading: false,
        error : false
    }


    componentDidMount = () => {
        axios.get("/ingredients.json")
            .then(response => {
                this.setState({ ingredients: response.data })
            })
            .catch(error => {
                this.setState({error : true})
            });
    }

    updatePurchaseState = (ingredients) => {
        let newPurchasable = false;
        for (let key in ingredients) {
            if (ingredients[key] > 0) {
                newPurchasable = true;
                break;
            }
        }

        this.setState({ purchasable: newPurchasable });
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCounted = oldCount + 1;
        const newIngredients = { ...this.state.ingredients }

        newIngredients[type] = updatedCounted;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;

        this.setState({ ingredients: newIngredients, totalPrice: newPrice });
        this.updatePurchaseState(newIngredients);
    }


    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0) {
            return;
        }
        const updatedCounted = oldCount - 1;
        const newIngredients = { ...this.state.ingredients }

        newIngredients[type] = updatedCounted;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;

        this.setState({ ingredients: newIngredients, totalPrice: newPrice });
        this.updatePurchaseState(newIngredients);
    }

    purchaseHandler = () => {
        this.setState({ purchasing: true });
    }


    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    }

    purchaseContinueHandler = () => {

        this.setState({ loading: true });


        //Add data to database
        // const order = {
        //     ingredients: this.state.ingredients,
        //     price: this.state.price,
        //     customer: {
        //         name: "Nitish Bala",
        //         address: {
        //             street: "32 Horton Street",
        //             postCode: "WF160LL",
        //             country: "UK"
        //         },
        //         email: "nitishbala2000@gmail.com"
        //     },
        //     deliveryMethod: "fastest"
        // };

        // //Adds a node under "orders" in the database
        // axios.post("/orders.json", order)
        //     .then((response) => {
        //         this.setState({ loading: false, purchasing: false });
        //     })
        //     .catch((error) => {
        //         this.setState({ loading: false, purchasing: false });
        //     });
            this.props.history.push("/checkout");
    }

    render() {
        const disabledInfo = {};

        for (let key in this.state.ingredients) {
            disabledInfo[key] = this.state.ingredients[key] <= 0;
        }

        let burger = this.state.error ? <p>Ingredients can't be loaded</p> : <Spinner/>

        let orderSummary = null;

        if (this.state.loading) {
            orderSummary = <Spinner></Spinner>
        }

        
        if (this.state.ingredients) {
            burger = (
                <Fragment>
                    <Burger ingredients={this.state.ingredients} />

                    <BuildControls
                        ingredientAdded={this.addIngredientHandler}
                        ingredientRemoved={this.removeIngredientHandler}
                        disabled={disabledInfo}
                        price={this.state.totalPrice}
                        purchasable={this.state.purchasable}
                        ordered={this.purchaseHandler}></BuildControls>
                </Fragment>
            );

            orderSummary = <OrderSummary
                ingredients={this.state.ingredients}
                price={this.state.totalPrice}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler} />;
        }

        if (this.state.loading) {
            orderSummary = <Spinner></Spinner>
        }

        return (

            <Fragment>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>

                {burger}
            </Fragment>
        );
    }
}


export default withErrorHandler(BurgerBuilder, axios);