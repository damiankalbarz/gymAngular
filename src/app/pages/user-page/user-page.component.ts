import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserNavbarComponent } from '../../components/user-navbar/user-navbar.component';


@Component({
  selector: 'app-user-page',
  standalone: true,
  imports: [RouterModule, CommonModule, UserNavbarComponent],
  templateUrl: './user-page.component.html',
  styleUrl: './user-page.component.css'
})
export class UserPageComponent {

}
