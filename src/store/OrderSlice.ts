import {IOrdersFull} from "../types";
import {createSlice} from "@reduxjs/toolkit";
import {fetchOrdersList} from "./PizzaThunk";


interface OrderState {
    orders: IOrdersFull[];
    fetchOneLoading: boolean;
}

const initialState: OrderState = {
    orders: [],
    fetchOneLoading: false,
};

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(fetchOrdersList.pending, (state) => {
            state.fetchOneLoading = true;
        });

        builder.addCase(fetchOrdersList.fulfilled, (state, action) => {
            state.fetchOneLoading = false;
            state.orders = action.payload;
        });

        builder.addCase(fetchOrdersList.rejected, (state) => {
            state.fetchOneLoading = false;
        });
    }
});


export const orderReducer = orderSlice.reducer;
