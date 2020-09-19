import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";

export const addIngredient = (ingredientType) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientType: ingredientType
    }
}
export const removeIngredient = (ingredientType) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientType: ingredientType
    }
}

export const initIngredients = () => {


    return dispatch => {

        axios.get("/ingredients.json")
        .then(response => {
            dispatch({
                type: actionTypes.SET_INGREDIENTS,
                ingredients: response.data
            });
        })
        .catch(error => {
            dispatch({type: actionTypes.FETCH_INGREDIENTS_FAILED})
        })
    }

}