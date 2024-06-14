import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../product.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  newProduct: Product = {
    id: 0,
    name: '',
    price:0,
    quantity: 0
  };
  isEditMode: boolean = false;
  isFormVisible: boolean = false;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
    });
  }

  deleteProduct(id: number): void {
    this.productService.deleteProduct(id).subscribe(() => this.loadProducts());
  }

  addProduct(): void {
    this.productService.addProduct(this.newProduct).subscribe(() => {
      this.loadProducts();
      this.resetNewProduct();
      this.isFormVisible = false;
    });
  }

  updateProduct(): void {
    if (this.newProduct.id) {
      this.productService.updateProduct(this.newProduct.id, this.newProduct).subscribe(() => {
        this.loadProducts();
        this.resetNewProduct();
        this.isEditMode = false;
        this.isFormVisible = false;
      });
    }
  }

  resetNewProduct(): void {
    this.newProduct = {
      id: 0,
      name: '',
      price: 0,
      quantity: 0
    };
  }

  onSubmit(): void {
    if (this.isEditMode) {
      this.updateProduct();
    } else {
      this.addProduct();
    }
  }

  editProduct(product: Product): void {
    this.newProduct = { ...product };
    this.isEditMode = true;
    this.isFormVisible = true;
  }

  showAddProductForm(): void {
    this.resetNewProduct();
    this.isEditMode = false;
    this.isFormVisible = true;
  }
}
