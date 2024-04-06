import { Component } from '@angular/core'
import { Product } from '../interfaces/product.interface'
import { ProductService } from '../services/product.service'
import { Router, ActivatedRoute } from '@angular/router'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
})
export class ProductFormComponent {
  product!: Product
  public FormRegister: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(50)]],
    description: ['', [Validators.required, Validators.maxLength(200)]],
    price: [0, [Validators.required, Validators.min(0)]],
    cant: [0, [Validators.required, Validators.min(0)]],
    imageURL: ['', [Validators.required]],
  })

  edit: boolean = false
  constructor(
    private productService: ProductService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    const params = this.activatedRoute.snapshot.params
    if (params && params['id']) {
      this.productService.getProduct(params['id']).subscribe((resp) => {
        this.product = resp
        this.FormRegister.patchValue(resp)
        this.edit = true
      })
    }
  }
  isNotValidField(field: string): boolean | null {
    const control = this.FormRegister.get(field)
    return control && control.invalid && (control.dirty || control.touched)
  }

  getFieldError(field: string): string | null {
    const control = this.FormRegister.get(field)
    if (!control) return null

    const errors = control.errors
    if (!errors) return null

    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este campo es requerido'

        case 'maxlength':
          return `El máximo número de caracteres permitido es ${errors['maxlength'].requiredLength}`

        case 'min':
          return `El valor mínimo permitido es es ${errors['min']['min']}`

        case 'pattern':
          return 'Ingresa un valor válido'

        default:
          return null
      }
    }

    return null // Agregamos esta línea al final de la función
  }

  submitProduct() {
    this.productService.createProducts(this.FormRegister.value).subscribe(
      (resp) => {
        this.router.navigate(['/dashboard/list-products'])
      },
      (err) => console.log(err)
    )
  }
  updateProduct() {
    delete this.FormRegister.value.createdAt
    this.productService.updateProduct(this.product._id!, this.FormRegister.value).subscribe(
      (resp) => {
        this.router.navigate(['/dashboard/list-products'])
      },
      (err) => {
        console.log(err)
      }
    )
  }
}
