import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { userProfileSchema } from 'src/modules/dashboard/schema';
import { MaterialModule } from 'src/shared/MaterialModule/Material-module';

@Component({
  selector: 'app-social-links',
  standalone: true,
  imports: [
    MaterialModule
  ],
  templateUrl: './social-links.component.html',
  styleUrl: './social-links.component.scss'
})
export class SocialLinksComponent {
  socialLinksFormGroup!: FormGroup;

  constructor() {
    this.socialLinksFormGroup = userProfileSchema.get('socialLinks') as FormGroup;
  }
}
