import React, {Component} from "react";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import classes from "./Auth.module.css";
import * as actions from "../../store/actions/index";
import {connect} from "react-redux";

class Auth extends Component {

    state = {
        controls: {
            email: {
                elementType: "input",
                elementConfig: {
                    type: "email",
                    placeholder: "Mail"
                },
                value: "",
                label:"Email",
                validation: {
                    required: true
                },
                valid: false,
                touched: false

            },

            password: {
                elementType: "input",
                elementConfig: {
                    type: "password",
                    placeholder: "password"
                },
                value: "",
                label:"Password",
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false

            }
        },
        isSignUp: true
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
        const controlsCopy = {...this.state.controls};
        const formElementCopy = {...controlsCopy[inputIdentifier]}

        formElementCopy.value = event.target.value;
        formElementCopy.valid = this.checkValidity(formElementCopy.value, formElementCopy.validation);
        formElementCopy.touched = true;

        controlsCopy[inputIdentifier] = formElementCopy;

        this.setState({controls : controlsCopy});
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignUp)
    }

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return {
                isSignUp: !prevState.isSignUp
            };
        });
    }

    render() {
        const inputs = [];
        for (let key in this.state.controls) {
            const val = this.state.controls[key];

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
        return (
            <div className={classes.Auth}>
                <h2>{this.state.isSignUp ? "Sign Up" : "Sign In"}</h2>
                <form onSubmit={this.submitHandler}>
                    {inputs}
                    <Button btnType="Success">SUBMIT</Button>
                </form>

                <Button btnType="Danger" clicked={this.switchAuthModeHandler}>SWITCH TO {this.state.isSignUp ? "SIGNIN" : "SIGNUP"}</Button>
            </div>

     
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp))
    }
}

export default connect(null, mapDispatchToProps)(Auth);