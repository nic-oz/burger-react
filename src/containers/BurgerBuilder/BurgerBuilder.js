import React, { Component } from 'react';

import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

const INGREDIENT_CALS = {
  onion: 114,
  tomato: 8,
  cheese: 96,
  bacon: 42,
  meat: 215,
  salad: 10
};

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      onion: 0,
      tomato: 0,
      bacon: 0,
      cheese: 0,
      meat: 0,
      salad: 0
    },
    totalCalories: 170,
    purchasable: false,
    purchasing: false
  };

  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    this.setState({ purchasable: sum > 0 });
  }

  addIngredientHandler = type => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;
    const calsAddition = INGREDIENT_CALS[type];
    const oldCalories = this.state.totalCalories;
    const newCalories = oldCalories + calsAddition;
    this.setState({
      totalCalories: newCalories,
      ingredients: updatedIngredients
    });
    this.updatePurchaseState(updatedIngredients);
  };

  removeIngredientHandler = type => {
    const oldCount = this.state.ingredients[type];
    if (oldCount <= 0) {
      return;
    }
    const updatedCount = oldCount - 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;
    const calsDeduction = INGREDIENT_CALS[type];
    const oldCalories = this.state.totalCalories;
    const newCalories = oldCalories - calsDeduction;
    this.setState({
      totalCalories: newCalories,
      ingredients: updatedIngredients
    });
    this.updatePurchaseState(updatedIngredients);
  };

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    alert('You continue!');
  };

  render() {
    const disabledInfo = {
      ...this.state.ingredients
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    return (
      <Aux>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          disabled={disabledInfo}
          calories={this.state.totalCalories}
        />
      </Aux>
    );
  }
}

export default BurgerBuilder;
