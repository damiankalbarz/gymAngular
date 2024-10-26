import { Component } from '@angular/core';
import { FitnessClassService } from '../../services/fitness-class.service';
import { FitnessClass } from '../../models/fitness-class.model';
import { FormsModule } from '@angular/forms';

import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-my-account',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './my-account.component.html',
  styleUrl: './my-account.component.css'
})
export class MyAccountComponent {
  enrolledClasses: FitnessClass[] = [];
  editingField: string | null = null;


  currentPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';

  userInfo: User = {
    firstname: '',
    lastname: '',
    email: '',
    phoneNumber: '',
  };


  constructor(private fitnessClassService: FitnessClassService, private userService: UserService) {}


  ngOnInit(): void {
    this.getEnrolledClasses();
    this.loadUserInfo();
  }

  loadUserInfo() {
     this.userService.getCurrentUser().subscribe(
       (user) => {
         this.userInfo = user;
       },
       (error) => {
         console.error('Failed to load user info:', error);
       }
     );
   }

    // Enable editing for a specific field
    editField(field: string) {
      this.editingField = field;
    }

    saveField() {
        const updatedData = {
          firstname: this.userInfo.firstname,
          lastname: this.userInfo.lastname,
          phoneNumber: this.userInfo.phoneNumber,
        };

        this.userService.updateUser(updatedData).subscribe(
          (updatedUser) => {
            this.userInfo = updatedUser;
            this.editingField = null; // Exit edit mode
          },
          (error) => {
            console.error('Failed to update user:', error);
          }
        );
      }

      // Cancel editing
      cancelEdit() {
        this.editingField = null; // Exit edit mode
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


   changePassword() {
    if (this.newPassword === this.confirmPassword) {
          // Call the service to change the password
          const passwordData = {
            currentPassword: this.currentPassword,
            newPassword: this.newPassword
          };

          this.userService.changePassword(passwordData).subscribe(
            () => {
              // Password changed successfully
              console.log('Password changed successfully');

              // Reset the fields
              this.currentPassword = '';
              this.newPassword = '';
              this.confirmPassword = '';
            },
            (error) => {
              // Handle error if password change fails
              console.error('Failed to change password:', error);
            }
          );
        } else {
          console.error('Passwords do not match');
        }
  }

}
