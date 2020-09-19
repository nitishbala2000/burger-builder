import * as actionTypes from "../actions/actionTypes";

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

const initialState = {
  
    ingredients: null,
    totalPrice: 4,
    purchasable: false,
    error: false
    
}

const getPurchaseState = (ingredients) => {
    
    for (let key in ingredients) {
        if (ingredients[key] > 0) {
            return true;
        }
    }

    return false;

}


const reducer = (state = initialState, action) => {

    switch (action.type) {
        case actionTypes.ADD_INGREDIENT : {
            const type = action.ingredientType;

            //Increment ingredient count
            const oldCount = state.ingredients[type];
            const updatedCounted = oldCount + 1;
            const newIngredients = { ...state.ingredients}
            newIngredients[type] = updatedCounted;

            //Set purchasable value
            const newPurchasable = getPurchaseState(newIngredients);
            
            //Increase price
            const priceAddition = INGREDIENT_PRICES[type];
            const oldPrice = state.totalPrice;
            const newPrice = oldPrice + priceAddition;
    
            return { ingredients: newIngredients, totalPrice: newPrice, purchasable: newPurchasable };
        }

        case actionTypes.REMOVE_INGREDIENT: {
            const type = action.ingredientType;

            //Increment ingredient count
            const oldCount = state.ingredients[type];
            if (oldCount <= 0) {
                return state;
            }


            const updatedCounted = oldCount - 1;
            const newIngredients = { ...state.ingredients}
            newIngredients[type] = updatedCounted;

            //Set purchasable value
            const newPurchasable = getPurchaseState(newIngredients);
            
            //Decrease price
            const priceDeduction = INGREDIENT_PRICES[type];
            const oldPrice = state.totalPrice;
            const newPrice = oldPrice - priceDeduction;

            return { ingredients: newIngredients, totalPrice: newPrice, purchasable: newPurchasable };

        }
        case actionTypes.SET_INGREDIENTS: {
            return {
                ...state,
                ingredients: action.ingredients,
                purchasable: getPurchaseState(action.ingredients),
                error: false
            }

        }

        case actionTypes.FETCH_INGREDIENTS_FAILED: {
            return {
                ...state,
                error: true
            }
        }

    }
    return state;
}


export default reducer;