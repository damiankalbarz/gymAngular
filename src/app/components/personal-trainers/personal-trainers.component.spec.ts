import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalTrainersComponent } from './personal-trainers.component';

describe('PersonalTrainersComponent', () => {
  let component: PersonalTrainersComponent;
  let fixture: ComponentFixture<PersonalTrainersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonalTrainersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PersonalTrainersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
