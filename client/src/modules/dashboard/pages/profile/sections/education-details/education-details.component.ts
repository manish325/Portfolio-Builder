import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { userProfileSchema } from 'src/modules/dashboard/schema';
import { MaterialModule } from 'src/shared/MaterialModule/Material-module';

@Component({
  selector: 'app-education-details',
  standalone: true,
  imports: [
    MaterialModule,
    ReactiveFormsModule
  ],
  templateUrl: './education-details.component.html',
  styleUrl: './education-details.component.scss'
})
export class EducationDetailsComponent implements OnInit {
  educationDetailsFormGroup !: FormArray<FormGroup>;
  parentFormGroup !: FormGroup;

  constructor() {
    this.parentFormGroup = userProfileSchema;
  }

  ngOnInit() {
    this.educationDetailsFormGroup = this.parentFormGroup.get('educationDetails') as FormArray<FormGroup>;
  }

  deleteEducation(index: number) {
    if (this.educationDetailsFormGroup.length > 1) {
      this.educationDetailsFormGroup.removeAt(index);
    }
  }

  addEducation() {
    const newEducation = new FormGroup({
      school: new FormControl(''),
      degree: new FormControl(''),
      fieldOfStudy: new FormControl(''),
      startDate: new FormControl(''),
      endDate: new FormControl(''),
      location: new FormControl(''),
      description: new FormControl('')
    });
    this.educationDetailsFormGroup.push(newEducation);
  }
}
