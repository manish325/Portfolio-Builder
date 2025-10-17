import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IStep } from 'src/modules/dashboard/types';
import { MatStepperModule, StepperOrientation } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-stepper',
  standalone: true,
  imports: [
    CommonModule,
    MatStepperModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatListModule,
    MatButtonModule,
    MatIconModule  
  ],
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss']
})
export class StepperComponent implements OnInit {
  @Input()
  steps !: IStep[];

  @Input()
  alignment !: StepperOrientation;

  currentIndex = 0;
  selectedStep!: IStep;
  sidebarExpanded = true;

  constructor() {}

  ngOnInit(): void {
      // Find the first leaf step (actual form component) to display
      this.selectedStep = this.findFirstLeafStep(this.steps[0]);
  }

  private findFirstLeafStep(step: IStep): IStep {
    // If this step has a component, it's a leaf
    if (step.component) {
      return step;
    }
    // If this step has child steps, find the first leaf in the children
    if (step.steps && step.steps.length > 0) {
      return this.findFirstLeafStep(step.steps[0]);
    }
    // Fallback to the step itself
    return step;
  }
  
  onSelectStep(step: IStep) {
    // If the step has a component, select it directly
    if (step.component) {
      this.selectedStep = step;
    } else if (step.steps && step.steps.length > 0) {
      // If it's a parent step, find the first leaf step
      this.selectedStep = this.findFirstLeafStep(step);
    } else {
      this.selectedStep = step;
    }
  }

  isCompleted(step: IStep): boolean {
    return !!step.control && (step.control.valid as boolean);
  }

  toggleSidebar() {
    this.sidebarExpanded = !this.sidebarExpanded;
  }

}
