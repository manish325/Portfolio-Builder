import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MaterialModule } from 'src/shared/MaterialModule/Material-module';
import { FormDataService } from '../../../../services/form-data.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-professional-memberships',
  standalone: true,
  imports: [
    MaterialModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './professional-memberships.component.html',
  styleUrls: ['./professional-memberships.component.scss']
})
export class ProfessionalMembershipsComponent implements OnInit {
  professionalMembershipsFormGroup!: FormArray<FormGroup>;
  parentFormGroup!: FormGroup;

  membershipTypes = ['Individual', 'Student', 'Corporate', 'Lifetime', 'Associate', 'Fellow', 'Other'];
  statuses = ['Active', 'Inactive', 'Expired', 'Suspended'];

  constructor(private formDataService: FormDataService) {
    this.parentFormGroup = this.formDataService.formData;
  }

  ngOnInit() {
    this.professionalMembershipsFormGroup = this.parentFormGroup.get('professionalMemberships') as FormArray<FormGroup>;
  }

  deleteProfessionalMembership(index: number) {
    this.professionalMembershipsFormGroup.removeAt(index);
  }

  addProfessionalMembership() {
    const newProfessionalMembership = new FormGroup({
      organizationName: new FormControl('', [Validators.required]),
      membershipType: new FormControl('', [Validators.required]),
      startDate: new FormControl('', [Validators.required]),
      endDate: new FormControl(''),
      status: new FormControl('Active'),
      membershipNumber: new FormControl(''),
      website: new FormControl(''),
      description: new FormControl(''),
      benefits: new FormControl([]),
      isLeadershipRole: new FormControl(false),
      leadershipPosition: new FormControl('')
    });
    this.professionalMembershipsFormGroup.push(newProfessionalMembership);
  }
}
