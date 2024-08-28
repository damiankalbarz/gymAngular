import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MembershipPassService } from '../../services/membership-pass.service';
import { MembershipPass } from '../../models/membership-pass.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule],
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']  // Poprawione z `styleUrl` na `styleUrls`
})
export class WelcomeComponent implements OnInit {
  membershipPasses: MembershipPass[] = [];  // Zmieniona nazwa z `membershipPass`

  constructor(private membershipPassService: MembershipPassService) { }

  ngOnInit(): void {
    this.membershipPassService.getAllMembershipPass()
      .subscribe({
        next: (passes) => this.membershipPasses = passes,  // Poprawiona nazwa
        error: (err) => console.error('Error fetching membership passes:', err)
      });
  }
}
