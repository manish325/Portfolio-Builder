import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MaterialModule } from 'src/shared/MaterialModule/Material-module';
import { FormDataService } from '../../../../services/form-data.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-publications',
  standalone: true,
  imports: [
    MaterialModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './publications.component.html',
  styleUrls: ['./publications.component.scss']
})
export class PublicationsComponent implements OnInit {
  publicationsFormGroup!: FormArray<FormGroup>;
  parentFormGroup!: FormGroup;

  publicationTypes = ['Journal Article', 'Conference Paper', 'Book', 'Book Chapter', 'Technical Report', 'Blog Post', 'Other'];

  constructor(private formDataService: FormDataService) {
    this.parentFormGroup = this.formDataService.formData;
  }

  ngOnInit() {
    this.publicationsFormGroup = this.parentFormGroup.get('publications') as FormArray<FormGroup>;
  }

  deletePublication(index: number) {
    this.publicationsFormGroup.removeAt(index);
  }

  addPublication() {
    const newPublication = new FormGroup({
      title: new FormControl('', [Validators.required]),
      abstract: new FormControl('', [Validators.required]),
      publicationType: new FormControl('', [Validators.required]),
      journalName: new FormControl(''),
      publisher: new FormControl(''),
      publicationDate: new FormControl('', [Validators.required]),
      doi: new FormControl(''),
      url: new FormControl(''),
      coAuthors: new FormControl([]),
      keywords: new FormControl([]),
      citationCount: new FormControl(null),
      isPeerReviewed: new FormControl(false)
    });
    this.publicationsFormGroup.push(newPublication);
  }
}
