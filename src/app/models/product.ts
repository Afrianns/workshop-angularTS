import { FormControl } from '@angular/forms';

export interface Product {
  id: number;
  brand: string;
  price: number;
  description: string;
}

export interface ProductResponse {
  products: Product[];
}
