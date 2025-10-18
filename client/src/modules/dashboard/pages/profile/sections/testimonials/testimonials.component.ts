import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MaterialModule } from 'src/shared/MaterialModule/Material-module';
import { FormDataService } from '../../../../services/form-data.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [
    MaterialModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.scss']
})
export class TestimonialsComponent implements OnInit {
  testimonialsFormGroup!: FormArray<FormGroup>;
  parentFormGroup!: FormGroup;

  ratings = [1, 2, 3, 4, 5];

  constructor(private formDataService: FormDataService) {
    this.parentFormGroup = this.formDataService.formData;
  }

  ngOnInit() {
    this.testimonialsFormGroup = this.parentFormGroup.get('testimonials') as FormArray<FormGroup>;
  }

  deleteTestimonial(index: number) {
    this.testimonialsFormGroup.removeAt(index);
  }

  addTestimonial() {
    const newTestimonial = new FormGroup({
      clientName: new FormControl('', [Validators.required]),
      clientTitle: new FormControl('', [Validators.required]),
      clientCompany: new FormControl('', [Validators.required]),
      testimonialText: new FormControl('', [Validators.required]),
      rating: new FormControl(5),
      testimonialDate: new FormControl('', [Validators.required]),
      projectName: new FormControl(''),
      clientEmail: new FormControl(''),
      clientPhoto: new FormControl(''),
      isPublic: new FormControl(true),
      isFeatured: new FormControl(false),
      tags: new FormControl([])
    });
    this.testimonialsFormGroup.push(newTestimonial);
  }
}
