import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { userProfileSchema } from 'src/modules/dashboard/schema';
import { MaterialModule } from 'src/shared/MaterialModule/Material-module';

@Component({
  selector: 'app-language-details',
  standalone: true,
  imports: [
    MaterialModule
  ],
  templateUrl: './language-details.component.html',
  styleUrl: './language-details.component.scss'
})
export class LanguageDetailsComponent {
  languageDetailsFormGroup !: FormArray<FormGroup>;

  constructor() {
    this.languageDetailsFormGroup = userProfileSchema.get('languageDetails') as FormArray<FormGroup>;
  }

  deleteLanguage(index: number) {
    this.languageDetailsFormGroup.removeAt(index);
  }

  addLanguage() {
    const newLanguage = new FormGroup({
      language: new FormControl(''),
      proficiency: new FormControl(0)
    });
    this.languageDetailsFormGroup.push(newLanguage);
  }
}
