import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginData = {
    email: '',
    password: ''
  };

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit() {
    this.authService.login(this.loginData).subscribe({
      next: (response) => {
        console.log('Login successful', response);
        this.router.navigate(['/user']);
      },
      error: (err) => {
        console.error('Login failed', err);
      }
    });
  }
}
