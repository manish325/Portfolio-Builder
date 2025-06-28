import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IStep } from 'src/modules/dashboard/types';
import { MatStepperModule, StepperOrientation } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-stepper',
  standalone: true,
  imports: [
    CommonModule,
    MatStepperModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule  
  ],
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss']
})
export class StepperComponent implements OnInit {
  @Input()
  steps !: IStep[];

  @Input()
  alignment !: StepperOrientation;

  constructor() {}

  ngOnInit(): void {
      
  }
  

}
