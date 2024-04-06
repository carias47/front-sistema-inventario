import { Injectable } from '@angular/core'
import { AngularFireAuth } from '@angular/fire/compat/auth'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private firebaseAuthService: AngularFireAuth) {}

  login(email: string, password: string) {
    return this.firebaseAuthService.signInWithEmailAndPassword(email, password)
  }
  logout() {
    return this.firebaseAuthService.signOut()
  }
}
