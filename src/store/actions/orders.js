import axios from "../../axios-orders";
import {SET_ORDERS, SET_ORDERS_FAIL} from "./actionTypes";

export const setOrders = (token, userId) => {
    return dispatch => {
        axios.get("/orders.json?auth=" + token + "&orderBy=\"userId\"&equalTo=\"" + userId + "\"")
        .then(response => {
            const fetchedOrders = [];
            for (let key in response.data) {
                fetchedOrders.push({...response.data[key], id:key});
            }

        
            dispatch({type : SET_ORDERS, orders : fetchedOrders})
        })
        .catch(error => {
            dispatch({type: SET_ORDERS_FAIL})
        })
    }
}