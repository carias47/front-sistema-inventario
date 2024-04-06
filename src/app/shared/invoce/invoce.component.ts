import { Component, Input } from '@angular/core'
import { Product } from 'src/app/components/products/interfaces/product.interface'

@Component({
  selector: 'app-invoce',
  templateUrl: './invoce.component.html',
  styleUrls: ['./invoce.component.css'],
})
export class InvoceComponent {
  @Input() listProducts: Product[] = []
  @Input() selectedQuantities: number[] = []

  calcularTotal(): number {
    let total = 0
    for (let i = 0; i < this.listProducts.length; i++) {
      total += (this.selectedQuantities[i] || 0) * this.listProducts[i].price
    }
    total *= 1.19
    return total
  }
}
