import { Product } from './product.interface'

export interface InvoiceItem {
  product: Product
  quantity: number
  total: number
}
