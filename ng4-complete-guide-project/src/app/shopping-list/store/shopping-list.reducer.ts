import { Ingredient } from '../../shared/ingredient.model';
import * as ShoppingListActions from './shopping-list.actions';

export interface State {
    ingredients: Ingredient[],
    editedIngredient: Ingredient,
    editedIngredientIndex: number
}

export interface AppState {
    shoppingList: State
}


const initialState: State = {
    ingredients: [
        new Ingredient('Apple', 4),
        new Ingredient('Tomato', 10)
    ],
    editedIngredient: null,
    editedIngredientIndex: -1
};
export function shoppingListReducer(state: State = initialState, action: ShoppingListActions.ShoppingListActions) {

    switch (action.type) {
        case ShoppingListActions.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: [...state.ingredients, action.payload]
            };

        case ShoppingListActions.ADD_INGREDIENTS:
            return {
                ...state,
                ingredients: [...state.ingredients, ...action.payload]
            }
        case ShoppingListActions.UPDATE_INGREDIENT:
            const ingredient = state.ingredients[state.editedIngredientIndex];
            const updateIngredient = {
                ...ingredient,
                ...action.payload
            }
            const updateIngredients = [...state.ingredients];
            updateIngredients[state.editedIngredientIndex] = updateIngredient;
            return {
                ...state,
                ingredients: updateIngredients,
                editedIngredient: null,
                editedIngredientIndex: -1
            };

        case ShoppingListActions.DELETE_INGREDIENT:
            return {
                ...state,
                ingredients: state.ingredients.filter((ig, igIndex) => {
                    return igIndex !== state.editedIngredientIndex;
                }),
                editedIngredient: null,
                editedIngredientIndex: -1
            };

        case ShoppingListActions.START_EDIT:
            return {
                ...state,
                editedIngredient: { ...state.ingredients[action.payload]},
                editedIngredientIndex: action.payload
            }; 
        case ShoppingListActions.STOP_EDIT:
            return {
                ...state,
                editedIngredientIndex: -1,
                editedIngredient: null
            };

        default:
            return state;
    }
}