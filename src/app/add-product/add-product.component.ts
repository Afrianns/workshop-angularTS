import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ProductService } from '../product.service';
import { Product } from '../models/product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent {
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private productService: ProductService
  ) {}

  form = this.fb.group({
    id: this.productService.products.length + 1,
    brand: this.fb.control('', Validators.required),
    price: this.fb.control(0, [Validators.required, Validators.min(0)]),
    description: this.fb.control('', Validators.required),
  });

  submiting = false;

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched(); // show validation errors
      return;
    }
    this.submiting = true;

    const newProduct: Product = {
      id: this.form.value.id!,
      brand: this.form.value.brand!,
      price: this.form.value.price!,
      description: this.form.value.description!,
    };
    // this.productService.create(this.form.value).subscribe({
    //   next: (res) => {

    this.submiting = false;
    this.productService.products.push(newProduct);
    this.productService.saveLocalStorage();
    this.router.navigate(['products']);
    //   },
    //   error: (err) => {
    this.submiting = false;
    //     alert('GAGAL: ' + err.message);
    //   },
    // });
  }
}
