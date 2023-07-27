import {IApiOrders, IPizzaBase, IPizzaFull} from "../types";
import {createSlice} from "@reduxjs/toolkit";
import {createPizza, deletePizza, fetchOne, fetchPizzaList, updatePizza} from "./PizzaThunk";
import {RootState} from "../app/store";

interface PizzaState {
    pizzaList: IPizzaFull[];
    pizza: IPizzaBase | null;
    fetchLoading: boolean;
    deleteLoading: boolean | string;
    orders: IApiOrders | null,
    fetchOneOrders: boolean;
    fetchOneLoading: boolean;
    updateLoading: boolean;
    addLoading: boolean;
}

const initialState: PizzaState = {
    pizzaList : [],
    orders: null,
    pizza: null,
    fetchLoading: false,
    deleteLoading: false,
    fetchOneLoading: false,
    addLoading: false,
    updateLoading: false,
    fetchOneOrders: false,
}

export const PizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        clear: (state) => {
            state.pizza = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPizzaList.pending, (state) => {
            state.fetchLoading = true;
        });

        builder.addCase(fetchPizzaList.fulfilled, (state, action) => {
            state.fetchLoading = false;
            state.pizzaList = action.payload;
        });

        builder.addCase(fetchPizzaList.rejected, (state) => {
            state.fetchLoading = false;
        });

        builder.addCase(fetchOne.pending, (state) => {
            state.fetchOneLoading = true;
        });

        builder.addCase(fetchOne.fulfilled, (state, action) => {
            state.fetchOneLoading = false;
            state.pizza = action.payload;
        });

        builder.addCase(fetchOne.rejected, (state) => {
            state.fetchOneLoading = false;
        });

        // builder.addCase(fetchOrdersList.pending, (state) => {
        //     state.fetchOneLoading = true;
        // });
        //
        // builder.addCase(fetchOrdersList.fulfilled, (state, action) => {
        //     state.fetchOneLoading = false;
        //     if (action.payload !== null) {
        //         state.orders = action.payload;
        //     }
        // });
        //
        // builder.addCase(fetchOrdersList.rejected, (state) => {
        //     state.fetchOneLoading = false;
        // });

        builder.addCase(createPizza.pending, (state) => {
            state.addLoading = true;
        });
        builder.addCase(createPizza.fulfilled, (state) => {
            state.addLoading = false;
        });
        builder.addCase(createPizza.rejected, (state) => {
            state.addLoading = false;
        });

        builder.addCase(updatePizza.pending, (state) => {
            state.updateLoading = true;
        });
        builder.addCase(updatePizza.fulfilled, (state) => {
            state.updateLoading = false;
        });
        builder.addCase(updatePizza.rejected, (state) => {
            state.updateLoading = false;
        });

        builder.addCase(deletePizza.pending, (state, action) => {
            state.deleteLoading = action.meta.arg;
        });
        builder.addCase(deletePizza.fulfilled, (state) => {
            state.deleteLoading = false;
        });
        builder.addCase(deletePizza.rejected, (state) => {
            state.deleteLoading = false;
        });
    }
});

export const PizzaReducer = PizzaSlice.reducer;

export const pizzaList = (state: RootState) => state.pizza.pizzaList;
export const pizzaListFetchLoading = (state: RootState) => state.pizza.fetchLoading;
export const pizzaDelLoading = (state: RootState) => state.pizza.deleteLoading;
export const pizzaFetchOneLoading = (state: RootState) => state.pizza.fetchOneLoading;
export const pizzaCreateLoading = (state: RootState) => state.pizza.addLoading;
export const pizzaUpdateLoading = (state: RootState) => state.pizza.updateLoading;
export const onePizza = (state: RootState) => state.pizza.pizza;
export const orders = (state: RootState) => state.pizza.orders;

export const {clear } = PizzaSlice.actions;


