import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.module.css";
import Spinner from "../../../components/UI/Spinner/Spinner";
import axios from "../../../axios-orders";
import Input from "../../../components/UI/Input/Input";
import { connect } from "react-redux";

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "Your name"
                },
                value: "",
                label:"Name",
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: "input",
                elementConfig: {
                    type: "email",
                    placeholder: "Your email"
                },
                value: "",
                label:"Email",
                validation: {
                    required: true
                },
                valid: false,
                touched: false

            },
            street: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "Your Street"
                },
                value: "",
                label: "Street",
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            postCode: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "Postcode"
                },
                value: "",
                label: "Postcode",
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "Country"
                },
                value: "",
                label: "Country",
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: "select",
                elementConfig: {
                    options: [{value:"fastest", displayValue: "Fastest"},
                            {value:"cheapest", displayValue: "Cheapest"}]
                    
                },
                value: "fastest",
                validation: {},
                label: "Delivery",
                valid: true,
                touched: false
            },
           
        },
        formIsValid: false,
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({ loading: true })

        const customerData = {};
        for (let key in this.state.orderForm) {
            customerData[key] = this.state.orderForm[key].value;
        }

        //Add data to database
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderData: customerData
        };

        // //Adds a node under "orders" in the database
        axios.post("/orders.json", order)
            .then((response) => {
                this.setState({ loading: false });
                this.props.history.push("/");
            })
            .catch((error) => {
                this.setState({ loading: false });
            });
    }

    checkValidity(value, rules) {

        let isValid = true;

        if (rules.required) {
            isValid = isValid && (value.trim() !== "");
        }

        if (rules.minLength) {
            isValid = isValid && (value.length >= rules.minLength);
        }

        if (rules.maxLength) {
            isValid = isValid && (value.length <= rules.maxLength);
        }


        return isValid;
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const orderFormCopy = {...this.state.orderForm};
        const formElementCopy = {...orderFormCopy[inputIdentifier]}

        formElementCopy.value = event.target.value;
        formElementCopy.valid = this.checkValidity(formElementCopy.value, formElementCopy.validation);
        formElementCopy.touched = true;

        orderFormCopy[inputIdentifier] = formElementCopy;

        let formIsValid = true;
        for (let key in orderFormCopy) {
            formIsValid = formIsValid && orderFormCopy[key].valid;
        }

        this.setState({orderForm : orderFormCopy, formIsValid: formIsValid});
    }

    render() {
        const inputs = [];
        for (let key in this.state.orderForm) {
            const val = this.state.orderForm[key];

            inputs.push(
                <Input
                    key={key}
                    elementType={val.elementType}
                    elementConfig={val.elementConfig}
                    value={val.value}
                    label={val.label}
                    invalid={!val.valid}
                    touched={val.touched}
                    changed={(event) => this.inputChangedHandler(event, key)}/>
            )
        };

        let form = (
            <form onSubmit={this.orderHandler}>
                {inputs}
                <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
            </form>
        );

        if (this.state.loading) {
            form = <Spinner />;
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your contact data</h4>
                {form}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ingredients : state.ingredients,
        price : state.totalPrice,
    }
}


export default connect(mapStateToProps)(ContactData);