import { Component } from '@angular/core';
import { FitnessClassService } from '../../services/fitness-class.service';
import { FitnessClass } from '../../models/fitness-class.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-my-account',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-account.component.html',
  styleUrl: './my-account.component.css'
})
export class MyAccountComponent {
  enrolledClasses: FitnessClass[] = [];

  constructor(private fitnessClassService: FitnessClassService) {}

  ngOnInit(): void {
    this.getEnrolledClasses();
  }

  getEnrolledClasses(): void {
    this.fitnessClassService.getEnrolledClassesForCurrentUser().subscribe(
      (classes) => {
        this.enrolledClasses = classes;
      },
      (error) => {
        console.error('Error fetching enrolled classes:', error);
      }
    );
  }

  cancelEnrollment(classId: number): void {
    this.fitnessClassService.cancelEnrollment(classId).subscribe(
      () => {
        this. getEnrolledClasses();
      },
      (error) => {
        console.error('Error canceling enrollment:', error);
      }
    );
  }
}
