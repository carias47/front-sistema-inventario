import { Component } from '@angular/core'
import { Product } from '../interfaces/product.interface'
import { ProductService } from '../services/product.service'

@Component({
  selector: 'app-factura-venta',
  templateUrl: './factura-venta.component.html',
  styleUrls: ['./factura-venta.component.css'],
})
export class FacturaVentaComponent {
  constructor(public listProductService: ProductService) {}

  listDataProducts: Product[] = []
  selectedProductIndices: number[] = []
  selectedProducts: Product[] = []

  ngOnInit() {
    this.listProductService.getProducts().subscribe((r) => {
      this.listDataProducts = r
    })
  }
  toggleSelection(index: number) {
    if (this.selectedProductIndices.includes(index)) {
      // Si el índice ya está seleccionado, lo eliminamos
      this.selectedProductIndices = this.selectedProductIndices.filter((i) => i !== index)
    } else {
      // Si el índice no está seleccionado, lo agregamos
      this.selectedProductIndices.push(index)
    }
  }

  showSelectedProducts() {
    this.selectedProducts = this.selectedProductIndices.map((index) => this.listDataProducts[index])
  }
}
