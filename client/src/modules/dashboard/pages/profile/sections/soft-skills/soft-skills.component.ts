import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MaterialModule } from 'src/shared/MaterialModule/Material-module';
import { FormDataService } from '../../../../services/form-data.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-soft-skills',
  standalone: true,
  imports: [
    MaterialModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './soft-skills.component.html',
  styleUrls: ['./soft-skills.component.scss']
})
export class SoftSkillsComponent implements OnInit {
  softSkillsFormGroup!: FormArray<FormGroup>;
  parentFormGroup!: FormGroup;

  constructor(private formDataService: FormDataService) {
    this.parentFormGroup = this.formDataService.formData;
  }

  ngOnInit() {
    this.softSkillsFormGroup = this.parentFormGroup.get('softSkills') as FormArray<FormGroup>;
    
    // Initialize with one soft skill if empty
    if (this.softSkillsFormGroup.length === 0) {
      this.addSoftSkill();
    }
  }

  deleteSoftSkill(index: number) {
    this.softSkillsFormGroup.removeAt(index);
  }

  addSoftSkill() {
    const newSoftSkill = new FormGroup({
      skillName: new FormControl('', [Validators.required]),
      proficiencyLevel: new FormControl(1, [Validators.required]),
      description: new FormControl(''),
      examples: new FormControl([]),
      isCoreSkill: new FormControl(false)
    });
    this.softSkillsFormGroup.push(newSoftSkill);
  }

  getProficiencyText(value: number): string {
    if (value === 1) return 'Beginner';
    if (value === 2) return 'Developing';
    if (value === 3) return 'Proficient';
    if (value === 4) return 'Advanced';
    if (value === 5) return 'Expert';
    return 'Not specified';
  }
}
