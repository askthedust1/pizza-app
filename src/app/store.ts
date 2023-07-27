import { configureStore } from "@reduxjs/toolkit";
import {PizzaReducer} from "../store/PizzaSlice";
import {cartReducer} from "../store/CartSlice";
import {orderReducer} from "../store/OrderSlice";


export const store = configureStore({
    reducer: {
        pizza: PizzaReducer,
        cart: cartReducer,
        order: orderReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;