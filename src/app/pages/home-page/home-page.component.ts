import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ChatComponent } from '../../components/chat/chat.component';


@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [RouterModule, CommonModule,FooterComponent, NavbarComponent, ChatComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

}
