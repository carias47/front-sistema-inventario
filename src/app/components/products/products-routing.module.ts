import { Component, NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { ProductListComponent } from './product-list/product-list.component'
import { ProductFormComponent } from './product-form/product-form.component'
import { HomeComponent } from '../home/home.component'
import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard'
import { FacturaVentaComponent } from './factura-venta/factura-venta.component'

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    ...canActivate(() => redirectUnauthorizedTo(['/auth'])),
    children: [
      {
        path: 'list-products',
        component: ProductListComponent,
      },
      {
        path: 'create-product',
        component: ProductFormComponent,
      },
      {
        path: 'product/edit/:id',
        component: ProductFormComponent,
      },
      {
        path: 'sale-invoice',
        component: FacturaVentaComponent,
      },
      {
        path: '**',
        redirectTo: 'list-products',
      },
    ],
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsRoutingModule {}
