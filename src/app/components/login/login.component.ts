import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { SocialAuthService, GoogleLoginProvider } from '@abacritt/angularx-social-login';
import { RecaptchaModule } from 'ng-recaptcha';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterModule,CommonModule, RecaptchaModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginData = {
    email: '',
    password: ''
  };
  loading = false;
  captchaToken: string | null = null;


  constructor( private socialAuthService: SocialAuthService,private authService: AuthService, private router: Router) { }

  ngOnInit() {
      this.renderGoogleButton();
    }

  onSubmit() {
    if (!this.captchaToken) {
      console.error('Captcha not completed');
      return;
    }

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

   onCaptchaResolved(token: string) {
      this.captchaToken = token;
   }

  renderGoogleButton() {
      window.google.accounts.id.initialize({
        client_id: '409882570176-6r0qoud42bh9u9n9ek8ud6eb9ort551q.apps.googleusercontent.com',
        callback: (response: any) => this.handleCredentialResponse(response),
      });

      window.google.accounts.id.renderButton(
        document.getElementById('googleSignInDiv'),
        { theme: 'outline', size: 'large' }
      );

      window.google.accounts.id.prompt();
    }

    handleCredentialResponse(response: any) {
      console.log('Encoded JWT ID token: ' + response.credential);
      this.authService.verifyGoogleToken(response.credential).subscribe({
        next: (authResponse) => {
          console.log('Google login successful', authResponse);
          this.router.navigate(['/user']);
        },
        error: (err) => {
          console.error('Google login failed', err);
        }
      });
    }
}
