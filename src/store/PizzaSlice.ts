import {IPizzaFull} from "../types";
import {createSlice} from "@reduxjs/toolkit";
import {fetchPizzaList} from "./PizzaThunk";
import {RootState} from "../app/store";

interface PizzaState {
    pizzaList: IPizzaFull[];
    fetchLoading: boolean;
}

const initialState: PizzaState = {
    pizzaList : [],
    fetchLoading: false,
}

export const PizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {},
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
    }
});

export const PizzaReducer = PizzaSlice.reducer;

export const pizzaList = (state: RootState) => state.pizza.pizzaList;
export const pizzaListFetchLoading = (state: RootState) => state.pizza.fetchLoading;

