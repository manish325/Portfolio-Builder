import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MaterialModule } from 'src/shared/MaterialModule/Material-module';
import { FormDataService } from '../../../../services/form-data.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-references',
  standalone: true,
  imports: [
    MaterialModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './references.component.html',
  styleUrls: ['./references.component.scss']
})
export class ReferencesComponent implements OnInit {
  referencesFormGroup!: FormArray<FormGroup>;
  parentFormGroup!: FormGroup;

  constructor(private formDataService: FormDataService) {
    this.parentFormGroup = this.formDataService.formData;
  }

  ngOnInit() {
    this.referencesFormGroup = this.parentFormGroup.get('references') as FormArray<FormGroup>;
    
    // Initialize with one reference if empty
    if (this.referencesFormGroup.length === 0) {
      this.addReference();
    }
  }

  deleteReference(index: number) {
    this.referencesFormGroup.removeAt(index);
  }

  addReference() {
    const newReference = new FormGroup({
      referenceName: new FormControl('', [Validators.required]),
      referenceTitle: new FormControl('', [Validators.required]),
      referenceCompany: new FormControl('', [Validators.required]),
      referenceEmail: new FormControl('', [Validators.required, Validators.email]),
      referencePhone: new FormControl(''),
      relationship: new FormControl(''),
      recommendation: new FormControl(''),
      canContact: new FormControl(false),
      lastContactDate: new FormControl('')
    });
    this.referencesFormGroup.push(newReference);
  }
}
