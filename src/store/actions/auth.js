import * as actionTypes from "./actionTypes";
import axios from "axios";




export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
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

            const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
            
            //Successful login
            localStorage.setItem("token", response.data.idToken );
            localStorage.setItem("expirationDate", expirationDate);
            localStorage.setItem("userId", response.data.localId);

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

    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");
    localStorage.removeItem("userId");
    return {type: actionTypes.AUTH_LOGOUT};
}


export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem("token");
        if (!token) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem("expirationDate"));
            if (new Date() < expirationDate) {

                //localStorage token not yet expired
                dispatch({
                    type: actionTypes.AUTH_SUCCESS,
                    userId: localStorage.getItem("userId"),
                    token: localStorage.getItem("token")
                });
                
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
            } else {
                //localStorage token expired
                dispatch(logout())
            }
        }
    }
}