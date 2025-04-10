

export interface User {
    id: string
    name: string
    skin_type: string
    price_min: number
    price_max: number
}

export interface Product {
    name: string;
    url: string;
    type: string;
    clean_ingreds: string[];
    price: string;
}