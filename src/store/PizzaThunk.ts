import {createAsyncThunk} from "@reduxjs/toolkit";
import {IPizzaBase, IPizzaFull, IPizzaList} from "../types";
import axiosApi from "../axiosApi";

export const fetchPizzaList = createAsyncThunk(
    'pizza/fetch',
    async () => {
        const pizzaListResponse = await axiosApi.get<IPizzaList | null>('/pizza.json');
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

export const fetchOne = createAsyncThunk(
    'pizza/fetchOne',
    async (id: string) => {
        const pizzaResponse = await axiosApi.get<IPizzaBase | null>(`/pizza/${id}.json`);
        return pizzaResponse.data;
    }
);

export const createPizza = createAsyncThunk<void, IPizzaBase>(
    'contacts/create',
    async (pizza) => {
        await axiosApi.post(`/pizza.json`, pizza);
    }
);

interface updatePizzaParams {
    id: string;
    pizza: IPizzaBase;
}

export const updatePizza = createAsyncThunk<void, updatePizzaParams>(
    'contacts/update',
    async (params) => {
        await axiosApi.put(`/pizza/${params.id}.json`, params.pizza);
    }
);

export const deletePizza = createAsyncThunk(
    'pizza/delete',
    async (id: string) => {
        await axiosApi.delete(`/pizza/${id}.json`);
    },
);