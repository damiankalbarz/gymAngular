import { Component } from '@angular/core';
import { FitnessClassService } from '../../services/fitness-class.service';
import { FitnessClass } from '../../models/fitness-class.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'classes-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './classes-list.component.html',
  styleUrl: './classes-list.component.css'
})
export class ClassesListComponent {
  fitnessClasses: FitnessClass[] = [];

    constructor(private fitnessClassService: FitnessClassService) { }

    ngOnInit(): void {
      this.fitnessClassService.getAllClasses().subscribe(data => {
        this.fitnessClasses = data;
      });
    }

    enrollInClass(classId: number) {

      console.log(`Zapisano na zajęcia o ID: ${classId}`);

    }
}
