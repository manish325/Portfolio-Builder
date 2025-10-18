import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MaterialModule } from 'src/shared/MaterialModule/Material-module';
import { FormDataService } from '../../../../services/form-data.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-achievements',
  standalone: true,
  imports: [
    MaterialModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './achievements.component.html',
  styleUrls: ['./achievements.component.scss']
})
export class AchievementsComponent implements OnInit {
  achievementsFormGroup!: FormArray<FormGroup>;
  parentFormGroup!: FormGroup;

  categories = ['Professional', 'Academic', 'Personal', 'Award', 'Recognition'];

  constructor(private formDataService: FormDataService) {
    this.parentFormGroup = this.formDataService.formData;
  }

  ngOnInit() {
    this.achievementsFormGroup = this.parentFormGroup.get('achievements') as FormArray<FormGroup>;
    
    // Initialize with one achievement if empty
    if (this.achievementsFormGroup.length === 0) {
      this.addAchievement();
    }
  }

  deleteAchievement(index: number) {
    this.achievementsFormGroup.removeAt(index);
  }

  addAchievement() {
    const newAchievement = new FormGroup({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      achievementDate: new FormControl('', [Validators.required]),
      category: new FormControl('Professional', [Validators.required]),
      organization: new FormControl(''),
      awardLevel: new FormControl(''),
      metrics: new FormControl([]),
      certificateUrl: new FormControl(''),
      isPublic: new FormControl(true)
    });
    this.achievementsFormGroup.push(newAchievement);
  }
}
