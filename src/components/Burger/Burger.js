import React from "react";
import classes from "./Burger.module.css";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";

const Burger = (props) => {
    
    const ingredients = [];
    for (let i = 0; i < props.ingredients.salad; i++) {
        ingredients.push(<BurgerIngredient type="salad" key={"salad" + i}/>);
    }

    for (let i = 0; i < props.ingredients.bacon; i++) {
        ingredients.push(<BurgerIngredient type="bacon" key={"bacon" + i}/>);
    }

    
    for (let i = 0; i < props.ingredients.cheese; i++) {
        ingredients.push(<BurgerIngredient type="cheese" key={"cheese" + i}/>);
    }

    for (let i = 0; i < props.ingredients.meat; i++) {
        ingredients.push(<BurgerIngredient type="meat" key={"meat" + i}/>);
    }




    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"/>
            {ingredients.length > 0 ? ingredients : <p>Please start adding ingredients</p>}
            <BurgerIngredient type="bread-bottom"/>
        </div>
    );
}

export default Burger;