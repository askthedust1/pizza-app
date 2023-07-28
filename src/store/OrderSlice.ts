import {IOrdersFull} from "../types";
import {createSlice} from "@reduxjs/toolkit";
import {deleteOrderList, fetchOrdersList} from "./PizzaThunk";
import {RootState} from "../app/store";


interface OrderState {
    orders: IOrdersFull[];
    fetchOneLoading: boolean;
    deleteLoading: boolean | string;
}

const initialState: OrderState = {
    orders: [],
    fetchOneLoading: false,
    deleteLoading: false,
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
        builder.addCase(deleteOrderList.pending, (state, action) => {
            state.deleteLoading = action.meta.arg;
        });
        builder.addCase(deleteOrderList.fulfilled, (state) => {
            state.deleteLoading = false;
        });
        builder.addCase(deleteOrderList.rejected, (state) => {
            state.deleteLoading = false;
        });
    }
});


export const orderReducer = orderSlice.reducer;
export const orderLoading = (state: RootState) => state.order.fetchOneLoading;
export const delOrderLoading = (state: RootState) => state.order.deleteLoading;

export const orderList = (state: RootState) => state.order.orders;
