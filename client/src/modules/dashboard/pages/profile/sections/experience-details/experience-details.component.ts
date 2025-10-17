import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { userProfileSchema } from 'src/modules/dashboard/schema';
import { MaterialModule } from 'src/shared/MaterialModule/Material-module';

@Component({
  selector: 'app-experience-details',
  standalone: true,
  imports: [
    MaterialModule,
    ReactiveFormsModule
  ],
  templateUrl: './experience-details.component.html',
  styleUrl: './experience-details.component.scss'
})
export class ExperienceDetailsComponent implements OnInit {
  experienceDetailsFormGroup !: FormArray<FormGroup>;
  parentFormGroup !: FormGroup;

  constructor() {
    this.parentFormGroup = userProfileSchema;
  }

  ngOnInit() {
    this.experienceDetailsFormGroup = this.parentFormGroup.get('experienceDetails') as FormArray<FormGroup>;
  }

  deleteExperience(index: number) {
    if (this.experienceDetailsFormGroup.length > 1) {
      this.experienceDetailsFormGroup.removeAt(index);
    }
  }

  addExperience() {
    const newExperience = new FormGroup({
      title: new FormControl(''),
      company: new FormControl(''),
      location: new FormControl(''),
      startDate: new FormControl(''),
      endDate: new FormControl(''),
      description: new FormControl('')
    });
    this.experienceDetailsFormGroup.push(newExperience);
  }
}
