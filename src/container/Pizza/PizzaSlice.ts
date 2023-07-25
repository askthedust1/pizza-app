import {IPizzaFull} from "../../types";
import {createSlice} from "@reduxjs/toolkit";
import {fetchPizzaList} from "./PizzaThunk";

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
})
