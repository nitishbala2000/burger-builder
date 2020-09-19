import React, { Component, Fragment } from "react";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as burgerBuilderActions from "../../store/actions/index";
import { connect } from "react-redux";

class BurgerBuilder extends Component {

    //Ingredients, price and purchasable managed by redux
    state = {
        purchasing: false,
        loading: false,
        error : false
    }

    componentDidMount() {
        this.props.initIngredients();
    }

  

    purchaseHandler = () => {
        this.setState({ purchasing: true });
    }


    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    }

    purchaseContinueHandler = () => {

        this.setState({ loading: true });

        //Don't need query params since can be found from redux
        this.props.history.push("/checkout");
    }

    render() {
        const disabledInfo = {};

        for (let key in this.props.ingredients) {
            disabledInfo[key] = this.props.ingredients[key] <= 0;
        }

        let burger = this.props.error ? <p>Ingredients can't be loaded</p> : <Spinner/>

        let orderSummary = null;

        if (this.state.loading) {
            orderSummary = <Spinner></Spinner>
        }

        
        if (this.props.ingredients) {
            burger = (
                <Fragment>
                    <Burger ingredients={this.props.ingredients} />

                    <BuildControls
                        ingredientAdded={this.props.addIngredient}
                        ingredientRemoved={this.props.removeIngredient}
                        disabled={disabledInfo}
                        price={this.props.totalPrice}
                        purchasable={this.props.purchasable}
                        ordered={this.purchaseHandler}></BuildControls>
                </Fragment>
            );

            orderSummary = <OrderSummary
                ingredients={this.props.ingredients}
                price={this.props.totalPrice}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler} />;
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

const mapStateToProps = state => {
    return {
        ingredients : state.ingredients,
        totalPrice : state.totalPrice,
        purchasable: state.purchasable,
        error: state.error
    }
}

const mapDipatchToProps = dispatch => {
    return {
        addIngredient : (ingredientType) => dispatch(burgerBuilderActions.addIngredient(ingredientType)),
        removeIngredient : (ingredientType) => dispatch(burgerBuilderActions.removeIngredient(ingredientType)),
        initIngredients: () => dispatch(burgerBuilderActions.initIngredients())
    }
}

export default connect(mapStateToProps, mapDipatchToProps) (withErrorHandler(BurgerBuilder, axios));