import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm?: any;

  constructor(private fb: FormBuilder, private authService : AuthService, private router: Router) {}

  ngOnInit(): void {
    // Inicjalizacja formularza logowania z walidacją dla nazwy użytkownika i hasła
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const username = this.loginForm.get('username').value;
      const password = this.loginForm.get('password').value;

      // Wywołanie metody logowania z serwisu uwierzytelniającego
      if (this.authService.login(username, password)) {
        // Nawigacja do komponentu ProductListComponent po pomyślnym zalogowaniu
        this.router.navigate(['/product-list']);
      } else {
        // Obsługa błędu uwierzytelnienia (np. wyświetlenie komunikatu o błędzie)
      }

    }
  }
}
