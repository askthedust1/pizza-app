import { configureStore } from "@reduxjs/toolkit";
import {PizzaReducer} from "../store/PizzaSlice";


export const store = configureStore({
    reducer: {
        pizza: PizzaReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;