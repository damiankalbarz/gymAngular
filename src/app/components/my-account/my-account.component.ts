import { Component } from '@angular/core';
import { FitnessClassService } from '../../services/fitness-class.service';
import { FitnessClass } from '../../models/fitness-class.model';
import { User } from '../../models/user.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-my-account',
  standalone: true,
  imports: [CommonModule,  FormsModule,],
  templateUrl: './my-account.component.html',
  styleUrl: './my-account.component.css'
})
export class MyAccountComponent {
  enrolledClasses: FitnessClass[] = [];

  currentPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';

  userInfo: User = {
    firstname: 'John',
    lastname: 'Doe',
    email: 'ala@ala.pl',
    phoneNumber: '666777555',
  };


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
  editField(field: keyof User) {
      // Logic to handle editing of the user fields
      console.log(`Editing ${field}`);
      // Implement the editing logic here, such as opening a modal
    }

     changePassword() {
        if (this.newPassword === this.confirmPassword) {
          // Logic to change the password
          console.log('Password changed successfully');
          // Reset the fields
          this.currentPassword = '';
          this.newPassword = '';
          this.confirmPassword = '';
        } else {
          console.error('Passwords do not match');
        }
      }
}
