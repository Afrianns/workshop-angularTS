import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ProductService } from '../product.service';
import { Product } from '../models/product';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent {
  router: any;
  constructor(
    private fb: FormBuilder,
    private productService: ProductService
  ) {}

  form = this.fb.group<Partial<Product>>({
    id: this.fb.control(1),
    brand: this.fb.control('', Validators.required),
    price: this.fb.control(0, [Validators.required, Validators.min(0)]),
    description: this.fb.control('', Validators.required),
  });
  submiting = false;

  submit() {
    this.submiting = true;
    this.productService.create(this.form.value).subscribe({
      next: (res) => {
        this.submiting = false;
        this.productService.products.push(res);
        this.router.navigate(['/products']);
      },
      error: (err) => {
        this.submiting = false;
        alert('GAGAL: ' + err.message);
      },
    });
  }
}
