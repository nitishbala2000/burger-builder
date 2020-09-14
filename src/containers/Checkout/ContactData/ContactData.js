import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.module.css";
import Spinner from "../../../components/UI/Spinner/Spinner";
import axios from "../../../axios-orders";
import Input from "../../../components/UI/Input/Input";

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
                            {value:"Cheapest", displayValue: "Cheapest"}]
                    
                },
                value: "",
                label: "Delivery",
                valid: true,
                touched: false
            },
           
        },
        ingredients: this.props.ingredients,
        price: this.props.price,
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
        this.setState({orderForm : orderFormCopy});
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
                <Button btnType="Success">ORDER</Button>
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

export default ContactData;