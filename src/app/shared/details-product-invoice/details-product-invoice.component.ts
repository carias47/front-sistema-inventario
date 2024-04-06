import { Component, ElementRef, Input, ViewChild } from '@angular/core'
import { Router } from '@angular/router'
import { ToastrService } from 'ngx-toastr'
import { Product } from 'src/app/components/products/interfaces/product.interface'
import { ProductService } from 'src/app/components/products/services/product.service'

@Component({
  selector: 'app-details-product-invoice',
  templateUrl: './details-product-invoice.component.html',
  styleUrls: ['./details-product-invoice.component.css'],
})
export class DetailsProductInvoiceComponent {
  @Input() listProducts: Product[] = []
  @ViewChild('exampleModal') miModal!: ElementRef

  selectedQuantities: number[] = []
  initialQuantities: number[] = []
  selectedQuantity: number = 0
  selectedProduct!: Product

  vistaActual: 'vista1' | 'vista2' = 'vista1'

  constructor(private productService: ProductService, private toastr: ToastrService, private router: Router) {
    this.selectedQuantities = new Array(this.listProducts.length).fill(0)
    this.initialQuantities = this.listProducts.map((product) => product.cant)
    ;(window as any).addEventListener('hidden.bs.modal', () => {
      this.selectedQuantities = new Array(this.listProducts.length).fill(0)
      this.reset('vista1')
    })
  }

  onQuantityChange(index: number) {
    this.selectedQuantity = this.selectedQuantities[index]

    this.selectedProduct = this.listProducts[index]
  }

  confirmSelections(vista: 'vista1' | 'vista2') {
    if (this.selectedQuantity <= 0) {
      this.toastr.info('La cantidad debe ser mayor que 0', 'info')
    } else {
      if (this.selectedQuantity > this.selectedProduct.cant) {
        this.toastr.error('La cantidad seleccionada excede la cantidad disponible del producto.', 'Error')
      } else {
        this.listProducts.forEach((product, index) => {
          this.vistaActual = vista
          product.cant -= this.selectedQuantities[index]

          const updatedProduct: Product = {
            name: product.name,
            description: product.description,
            cant: product.cant,
            price: product.price,
            imageURL: product.imageURL,
          }
          this.productService.updateProduct(product._id!, updatedProduct).subscribe(
            (r) => {
              this.toastr.success('Gracias por preferirnos :)', 'Exito')
            },
            (error) => {
              console.error('Error actualizando producto:', error)
            }
          )
        })
      }
    }
    this.initialQuantities = this.listProducts.map((product) => product.cant)
  }
  reset(vista: 'vista1' | 'vista2') {
    setTimeout(() => {
      this.vistaActual = vista
      this.selectedQuantities = new Array(this.listProducts.length).fill(0)
    }, 1000)
  }
}
