import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { AuthService } from 'src/app/auth/services/auth.service'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  constructor(private router: Router, private authService: AuthService) {}
  Logout() {
    this.authService
      .logout()
      .then(() => {
        this.router.navigate(['/auth'])
      })
      .catch((err) => console.log(err))
  }
}
