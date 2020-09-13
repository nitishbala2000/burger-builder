import React, {Component} from "react";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.module.css";
import Spinner from "../../../components/Spinner/Spinner";
import axios from "../../../axios-orders";

class ContactData extends Component {
    state = {
        name: "",
        email: "",
        address: {
            street: "",
            postalCode: ""
        },
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({loading : true})
        //Add data to database
        const order = {
            ingredients: this.state.ingredients,
            price: this.props.price,
            customer: {
                name: "Nitish Bala",
                address: {
                    street: "32 Horton Street",
                    postCode: "WF160LL",
                    country: "UK"
                },
                email: "nitishbala2000@gmail.com"
            },
            deliveryMethod: "fastest"
        };

        // //Adds a node under "orders" in the database
        axios.post("/orders.json", order)
            .then((response) => {
                this.setState({ loading: false});
                this.props.history.push("/");
            })
            .catch((error) => {
                this.setState({ loading: false});
            });
    }

    render() {
        let form = (
            <form>
                <input type="text" name="name" placeholder="Your name"/>
                <input type="email" name="email" placeholder="Your name"/>
                <input type="text" name="street" placeholder="Street"/>
                <input type="text" name="postal" placeholder="Postal Code"/>
                <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
            </form>
        );

        if (this.state.loading) {
            form = <Spinner/>;
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your contact data</h4>
                <form>
                    <input type="text" name="name" placeholder="Your name"/>
                    <input type="email" name="email" placeholder="Your name"/>
                    <input type="text" name="street" placeholder="Street"/>
                    <input type="text" name="postal" placeholder="Postal Code"/>
                    <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
                </form>
            </div>
        );
    }
}

export default ContactData;