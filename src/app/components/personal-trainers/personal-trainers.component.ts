import { Component } from '@angular/core';
import { PersonalTrainer } from '../../models/personal-trainer.model';
import { PersonalTrainerService } from '../../services/personal-trainer.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-personal-trainers',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './personal-trainers.component.html',
  styleUrl: './personal-trainers.component.css'
})
export class PersonalTrainersComponent {
  trainers: PersonalTrainer[] = [];

  constructor(private personalTrainerService: PersonalTrainerService) { }

  ngOnInit(): void {
    this.personalTrainerService.getPersonalTrainers().subscribe(data => {
      this.trainers = data;
    });
  }
}
