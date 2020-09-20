import * as actionTypes from "./actionTypes";
import axios from "axios";




export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch({
                type: actionTypes.AUTH_LOGOUT,
            })
        }, expirationTime * 1000);
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

        dispatch({type: actionTypes.AUTH_START})
        
        axios.post(url, authData)
        .then(response => {
            console.log(response);
            dispatch({
                type: actionTypes.AUTH_SUCCESS,
                userId: response.data.localId,
                token: response.data.idToken
            });

            dispatch(checkAuthTimeout(+response.data.expiresIn));
        })
        .catch(error => {
            console.log(error);
            dispatch({
                type: actionTypes.AUTH_FAIL,
                error: error.response.data.error
            })
        })
    }
}

export const logout = () => {
    return {type: actionTypes.AUTH_LOGOUT};
}