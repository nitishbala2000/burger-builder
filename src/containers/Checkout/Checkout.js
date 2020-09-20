import React, {Component} from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import {Route} from "react-router-dom";
import ContactData from "./ContactData/ContactData";
import { connect } from "react-redux";


class Checkout extends Component {

    checkoutCancelled = () => {
        this.props.history.goBack();
    }

    checkoutContinued = () => {

        this.props.history.replace("/checkout/contact-data");
    }

    render() {

       
        return (
            <div>
                <CheckoutSummary 
                    ingredients={this.props.ingredients}
                    checkoutCancelled={this.checkoutCancelled}
                    checkoutContinued={this.checkoutContinued}/>

                <Route path={this.props.match.path + "/contact-data"} render={(props) => <ContactData {...props}/>}/>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        ingredients : state.burgerBuilder.ingredients,
    }
}

export default connect(mapStateToProps)(Checkout);