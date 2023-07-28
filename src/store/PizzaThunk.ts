import {createAsyncThunk} from "@reduxjs/toolkit";
import {
    IApiOrders,
    IApiPizza,
    ICartPizza,
    IOrdersFull,
    IOrdersInfo,
    IPizzaBase,
    IPizzaFull,
    IPizzaList
} from "../types";
import axiosApi from "../axiosApi";
import {RootState} from "../app/store";

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

export const fetchOrdersList = createAsyncThunk<IOrdersFull[], undefined, {state: RootState}>(
    'order/fetchOrdersList',
    async (_, thunkAPI) => {
        await thunkAPI.dispatch(fetchPizzaList());
        const pizzas = thunkAPI.getState().pizza.pizzaList;
        console.log(pizzas)
        const ordersListResponse = await axiosApi.get<IApiOrders | null>('/pizza-orders.json');
        const orders = ordersListResponse.data;
        console.log(orders)

        let newList: IOrdersFull[] = [];


        if (orders) {
            for (let key in orders) {
                let meals: IOrdersInfo[] = [];
                let total = 0;
                for (let items in orders[key]) {
                    let index = pizzas.findIndex(item => item.id === items);
                    if (index !== -1) {
                        let dishes = {
                            name: pizzas[index].name,
                            price: pizzas[index].price,
                            amount: orders[key][items],
                        }
                        total += pizzas[index].price * orders[key][items];
                        meals.push(dishes);
                    } else {
                        meals.push({
                            name: 'Dish removed',
                            price: 0,
                            amount: 0,
                        });
                    }
                }
                newList.push({
                    totalSum: total + 150,
                    pizzas: meals,
                    orderId: key,
                });
            }
        }

        console.log('List' + newList)

        return newList;

    }
);

export const deleteOrderList = createAsyncThunk(
    'order/delete',
    async (id: string) => {
        await axiosApi.delete(`/pizza-orders/${id}.json`);
    },
);

export const fetchOne = createAsyncThunk(
    'pizza/fetchOne',
    async (id: string) => {
        const pizzaResponse = await axiosApi.get<IPizzaBase | null>(`/pizza/${id}.json`);
        return pizzaResponse.data;
    }
);

export const createPizza = createAsyncThunk<void, IPizzaBase>(
    'pizza/create',
    async (pizza) => {
        await axiosApi.post(`/pizza.json`, pizza);
    }
);

interface orderPizzaParams {
    order: ICartPizza[];
}

export const createOrder = createAsyncThunk<void, orderPizzaParams>(
    'cart/create',
    async (params) => {
        const orderData: IApiPizza = {};
        for (const item of params.order) {
            orderData[item.pizzaOrder.id] = item.amount;
        }

        await axiosApi.post(`/pizza-orders.json`, orderData);
    }
);

interface updatePizzaParams {
    id: string;
    pizza: IPizzaBase;
}

export const updatePizza = createAsyncThunk<void, updatePizzaParams>(
    'pizza/update',
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