import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root',
})
export class InvoicesService {
  productos: any[] = []
  total: number = 0

  agregarProducto(producto: any, cantidad: number) {
    this.productos.push({ producto, cantidad })
    this.calcularTotal()
  }

  calcularTotal() {
    this.total = 0
    this.productos.forEach((item) => {
      this.total += item.producto.precio * item.cantidad
    })
  }

  limpiarFactura() {
    this.productos = []
    this.total = 0
  }
}
