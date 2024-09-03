import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';




@Component({
  selector: 'user-navbar',
  standalone: true,
  imports: [ RouterModule],
  templateUrl: './user-navbar.component.html',
  styleUrl: './user-navbar.component.css'
})
export class UserNavbarComponent {

  constructor(private authService: AuthService, private router: Router) {}

  menuValue: boolean = false;
    menu_icon: string = 'bi bi-list';
    openMenu() {
      this.menuValue = !this.menuValue;
      this.menu_icon = this.menuValue ? 'bi bi-x' : 'bi bi-list';
    }
    closeMenu() {
      this.menuValue = false;
      this.menu_icon = 'bi bi-list';
    }

    logout() {
        this.authService.logout();
        this.router.navigate(['/home']);
      }
}
