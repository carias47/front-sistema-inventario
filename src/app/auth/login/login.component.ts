import { Component } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { AuthService } from '../services/auth.service'
import { Router } from '@angular/router'
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  public formulario: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  })

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  isNotValidField(field: string): boolean | null {
    return this.formulario.controls[field].errors && this.formulario.controls[field].touched
  }

  getFieldError(field: string): string | null {
    if (!this.formulario.controls[field]) return null
    const errors = this.formulario.controls[field].errors || {}
    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este campo es requerido'

        case 'email':
          return 'Ingresa un correo válido'
      }
    }
    return null
  }

  enviarFormulario() {
    if (this.formulario.valid) {
      const { email, password } = this.formulario.value

      this.authService
        .login(email, password)
        .then((resp) => {
          console.log(resp)
          this.router.navigate(['/dashboard/list-products'])
        })
        .catch((err) => {
          const myConfig = {
            timeOut: 3000,
            positionClass: 'toast-top-right',
            preventDuplicates: true,
            progressBar: true,
            closeButton: true,
          }
          this.toastr.error('Usuario o contraseña incorrectos', 'Error', myConfig)
          this.formulario.reset()
        })
    }
  }
}
