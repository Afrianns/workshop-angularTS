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

  showEditModal = false;
  editProduct: Product = { id: 0, brand: '', description: '', price: 0 };

  constructor(public productService: ProductService) {}

  ngOnInit(): void {
    if (this.productService.products.length === 0) this.load();
  }

  load() {
    this.loading = true;
    this.productService.getAll().subscribe({
      next: (res) => {
        this.productService.products = res.products;
        this.productService.saveLocalStorage();
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
    // this.productService.delete(id).subscribe({
    //   next: (res) => {
    this.productService.products = this.productService.products.filter(
      (a) => a.id !== id
    );
    this.productService.saveLocalStorage();
    // },
    //   error: (err) => {
    //     this.error = err.message;
    //   },
    // });
  }

  updateProduct(id: number) {
    const prod = this.productService.products.find((p) => p.id === id);
    if (!prod) return;

    this.editProduct = { ...prod }; // clone to avoid instant binding
    this.showEditModal = true;
  }

  saveUpdate() {
    const index = this.productService.products.findIndex(
      (p) => p.id === this.editProduct.id
    );
    if (index !== -1) {
      this.productService.products[index] = { ...this.editProduct };
      this.productService.saveLocalStorage();
    }
    this.showEditModal = false;
  }

  closeModal() {
    this.showEditModal = false;
  }
}
