import {createAsyncThunk} from "@reduxjs/toolkit";
import {IPizzaFull, IPizzaList} from "../../types";
import axiosApi from "../../axiosApi";

export const fetchPizzaList = createAsyncThunk(
    'contacts/fetch',
    async () => {
        const pizzaListResponse = await axiosApi.get<IPizzaList | null>('/contacts.json');
        const pizzaList = pizzaListResponse.data;
        let newPizzaList: IPizzaFull[] = [];

        if (pizzaList) {
            newPizzaList = Object.keys(pizzaList).map((key) => {
                return {...pizzaList[key], id: key};
            });
        }

        return newPizzaList;
    }
);