import { Component } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MaterialModule } from 'src/shared/MaterialModule/Material-module';
import { FormDataService } from '../../../../services/form-data.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-professional-summary',
  standalone: true,
  imports: [
    MaterialModule,
    CommonModule
  ],
  templateUrl: './professional-summary.component.html',
  styleUrls: ['./professional-summary.component.scss']
})
export class ProfessionalSummaryComponent {
  professionalSummaryFormGroup!: FormGroup;

  careerLevels = ['Entry', 'Mid', 'Senior', 'Executive', 'C-Level'];
  availabilityStatuses = ['Open to work', 'Not looking', 'Actively seeking', 'Open to opportunities'];
  workPreferences = ['Remote', 'Onsite', 'Hybrid'];

  constructor(private formDataService: FormDataService) {
    this.professionalSummaryFormGroup = this.formDataService.formData.get('professionalSummary') as FormGroup;
  }

  resetForm() {
    this.professionalSummaryFormGroup.reset();
  }

  saveForm() {
    if (this.professionalSummaryFormGroup.valid) {
      console.log('Professional summary data:', this.professionalSummaryFormGroup.value);
      // TODO: Implement save functionality
    }
  }
}
