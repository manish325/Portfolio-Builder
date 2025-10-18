import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MaterialModule } from 'src/shared/MaterialModule/Material-module';
import { FormDataService } from '../../../../services/form-data.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-language-details',
  standalone: true,
  imports: [
    MaterialModule,
    CommonModule
  ],
  templateUrl: './language-details.component.html',
  styleUrls: ['./language-details.component.scss']
})
export class LanguageDetailsComponent {
  languageDetailsFormGroup !: FormArray<FormGroup>;
  parentFormGroup !: FormGroup;

  constructor(private formDataService: FormDataService) {
    this.parentFormGroup = this.formDataService.formData;
    this.languageDetailsFormGroup = this.parentFormGroup.get('languageDetails') as FormArray<FormGroup>;
  }

  deleteLanguage(index: number) {
    this.languageDetailsFormGroup.removeAt(index);
  }

  addLanguage() {
    const newLanguage = new FormGroup({
      language: new FormControl('', [Validators.required]),
      proficiency: new FormControl(0, [Validators.required])
    });
    this.languageDetailsFormGroup.push(newLanguage);
  }

  getProficiencyText(value: number): string {
    if (value === 0) return 'Beginner (0-20%)';
    if (value === 25) return 'Elementary (21-40%)';
    if (value === 50) return 'Intermediate (41-60%)';
    if (value === 75) return 'Advanced (61-80%)';
    if (value === 100) return 'Fluent (81-100%)';
    return 'Not specified';
  }
}
