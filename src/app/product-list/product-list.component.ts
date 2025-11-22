import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../models/product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {

  loading = false;
  error = '';

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.loading = true;
    this.productService.getAll().subscribe({
      next: (res) => {
        this.productService.products = res.products;
        this.loading = false;
      },
      error: (err) => {
        this.error = err.message;
        this.loading = false;
      },

      complete: () => {
        this.loading = false;
      },
    });
  }

  deleteProduct(id: number) {
    if (!id) return;
    this.productService.delete(id).subscribe({
      next: (res) => {
        this.productService.products = this.productService.products.filter((a) => a.id !== id);
      },
      error: (err) => {
        this.error = err.message;
      },
    });
  }
}
