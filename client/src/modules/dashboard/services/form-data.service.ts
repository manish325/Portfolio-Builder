import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { enhancedUserProfileSchema } from '../schema';

@Injectable({
  providedIn: 'root'
})
export class FormDataService {
  private _formData: FormGroup = enhancedUserProfileSchema;

  get formData(): FormGroup {
    return this._formData;
  }

  set formData(form: FormGroup) {
    this._formData = form;
  }

  getFormControl(controlName: string): FormGroup {
    return this._formData.get(controlName) as FormGroup;
  }

  getFormArray(controlName: string) {
    return this._formData.get(controlName);
  }
}
