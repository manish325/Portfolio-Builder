import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MaterialModule } from 'src/shared/MaterialModule/Material-module';
import { FormDataService } from '../../../../services/form-data.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-board-positions',
  standalone: true,
  imports: [
    MaterialModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './board-positions.component.html',
  styleUrls: ['./board-positions.component.scss']
})
export class BoardPositionsComponent implements OnInit {
  boardPositionsFormGroup!: FormArray<FormGroup>;
  parentFormGroup!: FormGroup;

  organizationTypes = ['Public Company', 'Private Company', 'Non-Profit', 'Startup', 'Government', 'Educational', 'Other'];
  statuses = ['Active', 'Past', 'Advisory'];

  constructor(private formDataService: FormDataService) {
    this.parentFormGroup = this.formDataService.formData;
  }

  ngOnInit() {
    this.boardPositionsFormGroup = this.parentFormGroup.get('boardPositions') as FormArray<FormGroup>;
  }

  deleteBoardPosition(index: number) {
    this.boardPositionsFormGroup.removeAt(index);
  }

  addBoardPosition() {
    const newBoardPosition = new FormGroup({
      organizationName: new FormControl('', [Validators.required]),
      positionTitle: new FormControl('', [Validators.required]),
      startDate: new FormControl('', [Validators.required]),
      endDate: new FormControl(''),
      status: new FormControl('Active'),
      organizationType: new FormControl('', [Validators.required]),
      organizationSize: new FormControl(''),
      responsibilities: new FormControl(''),
      keyAchievements: new FormControl([]),
      website: new FormControl(''),
      isCompensated: new FormControl(false),
      compensation: new FormControl('')
    });
    this.boardPositionsFormGroup.push(newBoardPosition);
  }
}
