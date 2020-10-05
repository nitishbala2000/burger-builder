import {SET_ORDERS, SET_ORDERS_FAIL} from "../actions/actionTypes";

const initialState = {
    loading: true,
    orders: []
}

const reducer = (state = initialState, action) => {

    switch (action.type) {

        case SET_ORDERS: {
            return {
                ...state,
                loading: false,
                orders: action.orders
            }
        }

        case SET_ORDERS_FAIL: {
            return {
                ...state,
                loading : false,
            }
        }
    }

    return state;
}

export default reducer;