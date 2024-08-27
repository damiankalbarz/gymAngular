import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';




@Component({
  selector: 'user-navbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './user-navbar.component.html',
  styleUrl: './user-navbar.component.css'
})
export class UserNavbarComponent {
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
}
