import React, {Component, Fragment} from "react";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";

const INGREDIENT_PRICES = {
    salad : 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

class BurgerBuilder extends Component {


    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        purchasable: false,
        purchasing: false
    }

    updatePurchaseState = (ingredients) => {
        let newPurchasable = false;
        for (let key in ingredients) {
            if (ingredients[key] > 0) {
                newPurchasable = true;
                break;
            }
        }

        this.setState({purchasable: newPurchasable});
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCounted = oldCount + 1;
        const newIngredients = {...this.state.ingredients}

        newIngredients[type] = updatedCounted;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;

        this.setState({ingredients : newIngredients, totalPrice: newPrice});
        this.updatePurchaseState(newIngredients);
    }


    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0) {
            return;
        }
        const updatedCounted = oldCount - 1;
        const newIngredients = {...this.state.ingredients}

        newIngredients[type] = updatedCounted;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;

        this.setState({ingredients : newIngredients, totalPrice: newPrice});
        this.updatePurchaseState(newIngredients);
    }

    purchaseHandler = () => {
        this.setState({purchasing : true})
    }

    render() {
        const disabledInfo = {};

        for (let key in this.state.ingredients) {
            disabledInfo[key] = this.state.ingredients[key] <= 0;
        }


        return (
            
            <Fragment>
                <Modal show={this.state.purchasing}><OrderSummary ingredients={this.state.ingredients}></OrderSummary></Modal>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    price={this.state.totalPrice}
                    purchasable={this.state.purchasable}
                    ordered={this.purchaseHandler}></BuildControls>
            </Fragment>
        );
    }
}


export default BurgerBuilder;