export interface IPizzaBase {
    pic: string;
    name: string;
    price: number;
}

export interface IPizzaFull {
    id: string;
    pic: string;
    name: string;
    price: number;
}

export interface IPizzaList {
    [id: string]: IPizzaBase;
}

export interface ICartPizza {
    pizzaOrder: IPizzaFull;
    amount: number;
}

export interface IApiPizza {
    [dishId: string]: number;
}

export interface IApiOrders {
    [orderId: string]: IApiPizza;
}

export interface IOrdersInfo {
    name: string,
    price: number,
    amount: number;
}

export interface IOrdersFull {
    totalSum: number;
    pizzas: IOrdersInfo[],
    orderId: string;
}