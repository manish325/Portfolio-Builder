import { Component } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MaterialModule } from 'src/shared/MaterialModule/Material-module';
import { FormDataService } from '../../../../services/form-data.service';

@Component({
  selector: 'app-social-links',
  standalone: true,
  imports: [
    MaterialModule
  ],
  templateUrl: './social-links.component.html',
  styleUrls: ['./social-links.component.scss']
})
export class SocialLinksComponent {
  socialLinksFormGroup!: FormGroup;

  constructor(private formDataService: FormDataService) {
    this.socialLinksFormGroup = this.formDataService.formData.get('socialLinks') as FormGroup;
  }

  resetForm() {
    this.socialLinksFormGroup.reset();
  }

  saveForm() {
    if (this.socialLinksFormGroup.valid) {
      console.log('Social links data:', this.socialLinksFormGroup.value);
      // TODO: Implement save functionality
    }
  }
}
