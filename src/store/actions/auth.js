import * as actionTypes from "./actionTypes";
import axios from "axios";

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}


export const authSuccess = (authData) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        authData: authData
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const auth = (email, password, isSignUp) => {
    return dispatch => {
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }

        let url = "";
        if (isSignUp) {
            url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCG8ZzzSkAEPaoqDAX-5WP43urWkPfDuL8"
        } else {
            url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCG8ZzzSkAEPaoqDAX-5WP43urWkPfDuL8"
        }
        
        axios.post(url, authData)
        .then(response => {
            console.log(response);
            dispatch(authSuccess(response))
        })
        .catch(err => {
            console.log(err);
            dispatch(authFail(err));
        })
    }
}