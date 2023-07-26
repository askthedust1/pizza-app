import {ICartPizza, IPizzaFull} from "../types";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../app/store";

interface CartState {
    cartPizza: ICartPizza[];
}

const initialState: CartState = {
    cartPizza: [],
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addPizzas: (state, { payload: pizza }: PayloadAction<IPizzaFull>) => {
            const existingIndex = state.cartPizza.findIndex(cartItem => cartItem.pizzaOrder.id === pizza.id);

            if (existingIndex !== -1) {
                state.cartPizza[existingIndex].amount++;
            } else {
                state.cartPizza.push({
                    amount: 1,
                    pizzaOrder: pizza,
                });
            }
        },
    }
});


export const cartReducer = cartSlice.reducer;
export const order = (state: RootState) => state.cart.cartPizza;

export const {addPizzas} = cartSlice.actions;