import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MaterialModule } from 'src/shared/MaterialModule/Material-module';
import { FormDataService } from '../../../../services/form-data.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-education-details',
  standalone: true,
  imports: [
    MaterialModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './education-details.component.html',
  styleUrls: ['./education-details.component.scss']
})
export class EducationDetailsComponent implements OnInit {
  educationDetailsFormGroup !: FormArray<FormGroup>;
  parentFormGroup !: FormGroup;

  constructor(private formDataService: FormDataService) {
    this.parentFormGroup = this.formDataService.formData;
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
      school: new FormControl('', [Validators.required]),
      degree: new FormControl('', [Validators.required]),
      fieldOfStudy: new FormControl('', [Validators.required]),
      startDate: new FormControl('', [Validators.required]),
      endDate: new FormControl('', [Validators.required]),
      location: new FormControl(''),
      description: new FormControl('')
    });
    this.educationDetailsFormGroup.push(newEducation);
  }
}
