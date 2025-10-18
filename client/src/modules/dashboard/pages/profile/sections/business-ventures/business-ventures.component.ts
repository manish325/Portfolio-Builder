import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MaterialModule } from 'src/shared/MaterialModule/Material-module';
import { FormDataService } from '../../../../services/form-data.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-business-ventures',
  standalone: true,
  imports: [
    MaterialModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './business-ventures.component.html',
  styleUrls: ['./business-ventures.component.scss']
})
export class BusinessVenturesComponent implements OnInit {
  businessVenturesFormGroup!: FormArray<FormGroup>;
  parentFormGroup!: FormGroup;

  ventureTypes = ['Startup', 'Side Project', 'Freelance Business', 'Consulting', 'E-commerce', 'SaaS', 'Mobile App', 'Other'];
  statuses = ['Active', 'Inactive', 'Sold', 'Closed', 'Acquired'];

  constructor(private formDataService: FormDataService) {
    this.parentFormGroup = this.formDataService.formData;
  }

  ngOnInit() {
    this.businessVenturesFormGroup = this.parentFormGroup.get('businessVentures') as FormArray<FormGroup>;
  }

  deleteBusinessVenture(index: number) {
    this.businessVenturesFormGroup.removeAt(index);
  }

  addBusinessVenture() {
    const newBusinessVenture = new FormGroup({
      ventureName: new FormControl('', [Validators.required]),
      ventureType: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      startDate: new FormControl('', [Validators.required]),
      endDate: new FormControl(''),
      status: new FormControl('Active'),
      website: new FormControl(''),
      industry: new FormControl(''),
      teamSize: new FormControl(null),
      fundingAmount: new FormControl(''),
      revenue: new FormControl(''),
      keyMetrics: new FormControl([]),
      technologies: new FormControl([]),
      lessonsLearned: new FormControl('')
    });
    this.businessVenturesFormGroup.push(newBusinessVenture);
  }
}
