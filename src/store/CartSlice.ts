import {ICartPizza, IPizzaFull} from "../types";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../app/store";
import {createOrder} from "./PizzaThunk";

interface CartState {
    cartPizza: ICartPizza[];
    addLoading: boolean;
}

const initialState: CartState = {
    cartPizza: [],
    addLoading: false,
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
        deleteOne: (state, action) => {
            state.cartPizza.filter(item => item.pizzaOrder.id !== action.payload)
            const index = state.cartPizza.findIndex(obj => obj.pizzaOrder.id === action.payload);
            if (index !== -1) {
                state.cartPizza.splice(index, 1);
            }
        },
        clearCart: (state) => {
            state.cartPizza = [];
        }
    },
    extraReducers: (builder) => {
        builder.addCase(createOrder.pending, (state) => {
            state.addLoading = true;
        });
        builder.addCase(createOrder.fulfilled, (state) => {
            state.addLoading = false;
        });
        builder.addCase(createOrder.rejected, (state) => {
            state.addLoading = false;
        });
    }
});


export const cartReducer = cartSlice.reducer;
export const order = (state: RootState) => state.cart.cartPizza;

export const {addPizzas, deleteOne, clearCart} = cartSlice.actions;