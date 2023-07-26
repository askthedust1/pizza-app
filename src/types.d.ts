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
    pizzaOrder: IPizzaFull,
    amount: number,
}