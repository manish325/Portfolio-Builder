import { Component, Input, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IStep } from 'src/modules/dashboard/types';
import { MatStepperModule, StepperOrientation } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormDataService } from '../../modules/dashboard/services/form-data.service';

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
    MatIconModule,
    MatTooltipModule
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
  fullScreenMode = false;
  compactMode = false;
  allSteps: IStep[] = [];
  completedSteps: Set<number> = new Set();
  stepStatuses: Map<number, 'incomplete' | 'active' | 'completed'> = new Map();

  constructor(private formDataService: FormDataService) {}

  ngOnInit(): void {
      // Set the form data in the service
      this.formDataService.formData = this.steps[0].control;
      // Flatten all steps to create a linear navigation
      this.allSteps = this.flattenSteps(this.steps);
      // Find the first leaf step (actual form component) to display
      this.selectedStep = this.findFirstLeafStep(this.steps[0]);
      this.currentIndex = this.allSteps.findIndex(step => step === this.selectedStep);
      // Initialize step statuses
      this.initializeStepStatuses();
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
  

  isCompleted(step: IStep): boolean {
    const stepIndex = this.allSteps.findIndex(s => s === step);
    return this.completedSteps.has(stepIndex);
  }

  toggleSidebar() {
    this.sidebarExpanded = !this.sidebarExpanded;
  }

  toggleFullScreen(): void {
    this.fullScreenMode = !this.fullScreenMode;
    if (this.fullScreenMode) {
      this.sidebarExpanded = false;
    } else {
      this.compactMode = false;
    }
  }

  toggleCompactMode(): void {
    this.compactMode = !this.compactMode;
  }

  @HostListener('document:keydown.escape', ['$event'])
  onEscapeKey(event: KeyboardEvent): void {
    if (this.fullScreenMode) {
      this.fullScreenMode = false;
    }
  }

  @HostListener('document:keydown.control.shift.c', ['$event'])
  onCompactModeShortcut(event: KeyboardEvent): void {
    if (this.fullScreenMode) {
      event.preventDefault();
      this.toggleCompactMode();
    }
  }

  private flattenSteps(steps: IStep[]): IStep[] {
    const flattened: IStep[] = [];
    for (const step of steps) {
      if (step.component) {
        flattened.push(step);
      }
      if (step.steps) {
        flattened.push(...this.flattenSteps(step.steps));
      }
    }
    return flattened;
  }

  goToNext() {
    if (this.currentIndex < this.allSteps.length - 1) {
      this.currentIndex++;
      this.selectedStep = this.allSteps[this.currentIndex];
    }
  }

  goToPrevious() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.selectedStep = this.allSteps[this.currentIndex];
    }
  }

  canGoNext(): boolean {
    return this.currentIndex < this.allSteps.length - 1;
  }

  canGoPrevious(): boolean {
    return this.currentIndex > 0;
  }

  getProgressPercentage(): number {
    if (this.allSteps.length === 0) return 0;
    return Math.round((this.completedSteps.size / this.allSteps.length) * 100);
  }

  getProgressCircleDash(): string {
    const circumference = 2 * Math.PI * 30; // radius = 30
    return `${circumference}`;
  }

  getProgressCircleOffset(): string {
    const circumference = 2 * Math.PI * 30; // radius = 30
    const progress = this.getProgressPercentage() / 100;
    return `${circumference - (progress * circumference)}`;
  }

  getStepIcon(step: IStep): string {
    const iconMap: { [key: string]: string } = {
      // Main Categories
      'Basic Details': 'person',
      'Professional Summary': 'work',
      'Professional Skills': 'build',
      'Professional Experience': 'work_history',
      'Professional Development': 'school',
      'Professional Network': 'people',
      'Leadership & Business': 'business',
      
      // Sub-steps
      'Profile Details': 'person',
      'Social Details': 'share',
      'Educational Details': 'school',
      'Experience Details': 'work_history',
      'Language Details': 'language',
      'Technical Skills': 'build',
      'Soft Skills': 'psychology',
      'Work Experience': 'work_history',
      'Projects': 'folder',
      'Achievements & Awards': 'emoji_events',
      'Education': 'school',
      'Publications & Research': 'article',
      'Speaking Engagements': 'mic',
      'Professional Memberships': 'groups',
      'Professional References': 'contacts',
      'Client Testimonials': 'star',
      'Business Ventures': 'business',
      'Board Positions': 'account_balance'
    };
    return iconMap[step.title] || 'assignment';
  }

  // Step Status Management
  private initializeStepStatuses(): void {
    this.allSteps.forEach((_, index) => {
      this.stepStatuses.set(index, 'incomplete');
    });
    // Set first step as active
    this.stepStatuses.set(0, 'active');
  }

  updateStepStatus(stepIndex: number, status: 'incomplete' | 'active' | 'completed'): void {
    this.stepStatuses.set(stepIndex, status);
    
    if (status === 'completed') {
      this.completedSteps.add(stepIndex);
    } else {
      this.completedSteps.delete(stepIndex);
    }
  }

  getStepStatus(stepIndex: number): 'incomplete' | 'active' | 'completed' {
    return this.stepStatuses.get(stepIndex) || 'incomplete';
  }

  isStepCompleted(stepIndex: number): boolean {
    return this.completedSteps.has(stepIndex);
  }

  isStepActive(stepIndex: number): boolean {
    return stepIndex === this.currentIndex;
  }

  // Enhanced navigation with status updates
  goToNextWithValidation(): void {
    if (this.canGoNext()) {
      // Mark current step as completed if form is valid
      if (this.isCurrentStepValid()) {
        this.updateStepStatus(this.currentIndex, 'completed');
      }
      
      this.goToNext();
      
      // Mark next step as active
      if (this.currentIndex < this.allSteps.length) {
        this.updateStepStatus(this.currentIndex, 'active');
      }
    }
  }

  goToPreviousWithStatusUpdate(): void {
    if (this.canGoPrevious()) {
      // Mark current step as incomplete when going back
      this.updateStepStatus(this.currentIndex, 'incomplete');
      
      this.goToPrevious();
      
      // Mark previous step as active
      this.updateStepStatus(this.currentIndex, 'active');
    }
  }

  private isCurrentStepValid(): boolean {
    // Check if the current step's form is valid
    // This is a basic implementation - you might want to enhance this
    return this.formDataService.formData.valid;
  }

  // Override the existing navigation methods to include status updates
  onSelectStep(step: IStep): void {
    const stepIndex = this.allSteps.findIndex(s => s === step);
    if (stepIndex !== -1) {
      // Mark current step as incomplete if going back
      if (stepIndex < this.currentIndex) {
        this.updateStepStatus(this.currentIndex, 'incomplete');
      }
      
      this.currentIndex = stepIndex;
      this.selectedStep = step;
      
      // Mark selected step as active
      this.updateStepStatus(stepIndex, 'active');
    }
  }

}
