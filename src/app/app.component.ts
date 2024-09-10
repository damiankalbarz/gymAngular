import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SocialLoginModule } from '@abacritt/angularx-social-login';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SocialLoginModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Gym-Angular';
}
