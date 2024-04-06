import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { ProductsRoutingModule } from './products-routing.module'
import { ProductFormComponent } from './product-form/product-form.component'
import { ProductListComponent } from './product-list/product-list.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HomeComponent } from '../home/home.component'
import { NavbarComponent } from '../navbar/navbar.component'
import { FacturaVentaComponent } from './factura-venta/factura-venta.component'
import { DetailsProductInvoiceComponent } from 'src/app/shared/details-product-invoice/details-product-invoice.component'
import { InvoceComponent } from 'src/app/shared/invoce/invoce.component'

@NgModule({
  declarations: [
    ProductFormComponent,
    ProductListComponent,
    HomeComponent,
    NavbarComponent,
    FacturaVentaComponent,
    InvoceComponent,
    DetailsProductInvoiceComponent,
  ],
  imports: [CommonModule, ProductsRoutingModule, FormsModule, ReactiveFormsModule],
})
export class ProductsModule {}
