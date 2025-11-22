import { FormControl } from '@angular/forms';

export interface Product {
  id: number;
  brand: Partial<FormControl<string | null>>;
  price: Partial<FormControl<number | null>>;
  description: Partial<FormControl<string | null>>;
}

export interface ProductResponse {
  products: Product[];
}
