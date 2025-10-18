import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MaterialModule } from 'src/shared/MaterialModule/Material-module';
import { FormDataService } from '../../../../services/form-data.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-experience-details',
  standalone: true,
  imports: [
    MaterialModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './experience-details.component.html',
  styleUrls: ['./experience-details.component.scss']
})
export class ExperienceDetailsComponent implements OnInit {
  experienceDetailsFormGroup !: FormArray<FormGroup>;
  parentFormGroup !: FormGroup;

  constructor(private formDataService: FormDataService) {
    this.parentFormGroup = this.formDataService.formData;
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
      title: new FormControl('', [Validators.required]),
      company: new FormControl('', [Validators.required]),
      location: new FormControl(''),
      startDate: new FormControl('', [Validators.required]),
      endDate: new FormControl(''),
      description: new FormControl('', [Validators.required])
    });
    this.experienceDetailsFormGroup.push(newExperience);
  }
}
