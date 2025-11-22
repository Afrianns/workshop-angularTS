export interface Product {
    id?: any;
    brand: any;
    price: any;
    description: any;
}

export interface ProductResponse {
    products: Product[];
}