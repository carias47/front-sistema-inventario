import { Component, OnInit } from '@angular/core'
import { ProductService } from '../services/product.service'
import { Product } from '../interfaces/product.interface'

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products: Product[] = []
  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.getProducts()
  }

  getProducts() {
    this.productService.getProducts().subscribe(
      (resp) => {
        this.products = resp
      },
      (err) => {
        console.log(err)
      }
    )
  }
  deleteProduct(id: string) {
    this.productService.deleteProduct(id).subscribe(
      (resp) => {
        this.getProducts()
      },
      (err) => {
        console.log(err)
      }
    )
  }
  CantAlert(quantity: number): boolean {
    return quantity <= 2
  }
}
