import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../Services/product.service';
import { Product } from '../../model/product.model';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-products',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule, ReactiveFormsModule],
  templateUrl: './product-admin.component.html',
  styleUrl: './product-admin.component.css'
})
export class AdminProductsComponent implements OnInit {
displayed: boolean = false;

  products: Product[] = [];
  editProductId: string | null = "";

  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (results)=>{
        if(results){
          this.products = results;
        }
      }
    })
  }

  displayAdd() {
    this.displayed = !this.displayed;
    this.editProductId = "";
    this.scrollDown();
  }

  addProduct(): void {
    let product: Product = {
      id: '',
      name: String(this.newProductForm.controls.name.value),
      title: String(this.newProductForm.controls.title.value),
      category: String(this.newProductForm.controls.category.value),
      details: String(this.newProductForm.controls.details.value),
      price: Number(this.newProductForm.controls.price.value),
      image: String(this.newProducImage)
    };
    if (this.products.length > 0) {
      product.id = (Math.max(...this.products.map(p => Number(p.id))) + 1).toString();
    } else {
      product.id = '1';
    }
    this.products.push(product);
    this.productService.addProduct(product).subscribe();
    this.newProductForm.reset();
    this.newProducImage = null;
  }

  deleteProduct(id: string | null): void {
    this.products = this.products.filter(product => product.id !== id);
    this.productService.deleteProduct(String(id)).subscribe();
  }

  editProduct(product: Product): void {
    this.editProductId = product.id;
    this.editProductForm.patchValue({
      name: product.name,
      title: product.title,
      category: product.category,
      details: product.details,
      price: product.price?.toString(),
    });
    this.editProducImage = product.image;
    this.displayed = false;
    this.scrollDown();
  }

  updateProduct(): void {
    let product: Product = {
      id: String(this.editProductId),
      name: String(this.editProductForm.controls.name.value),
      title: String(this.editProductForm.controls.title.value),
      category: String(this.editProductForm.controls.category.value),
      details: String(this.editProductForm.controls.details.value),
      price: Number(this.editProductForm.controls.price.value),
      image: String(this.editProducImage)
    };
    if (this.editProductId !== '') {
      const index = this.products.findIndex(p => p.id === this.editProductId);
      if (index !== -1) {
        this.products[index] = product;
        this.productService.updateProduct(product).subscribe();
      }
      this.editProductId = "";
    }
  }

  cancelEdit(): void {
    this.editProductId = "";
    this.displayed = false;
  }

  newProductForm = new FormGroup({
    name: new FormControl('', Validators.required),
    title: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
    details: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
    image: new FormControl('', Validators.required),
  });
  editProductForm = new FormGroup({
    name: new FormControl('', Validators.required),
    title: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
    details: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
    image: new FormControl('', Validators.required),
  });

  newProducImage: string | ArrayBuffer | null = null;
  editProducImage: string | ArrayBuffer | null = null;
  onNewImageSelected(event: Event): void {
    const file = (event.target as HTMLInputElement)?.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        this.newProducImage = reader.result;
      };
      reader.readAsDataURL(file);
    } else {
      console.error('File Error');
    }
  }
  onEditImageSelected(event: Event): void {
    const file = (event.target as HTMLInputElement)?.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        this.editProducImage = reader.result;
      };
      reader.readAsDataURL(file);
    } else {
      console.error('File Error');
    }
  }
  scrollDown() {
    setTimeout(() => {
      window.scrollTo({ top: 10000, behavior: 'smooth' });
    }, 200);
    
  }
}
