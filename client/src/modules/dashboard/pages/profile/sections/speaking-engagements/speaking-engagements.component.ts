import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MaterialModule } from 'src/shared/MaterialModule/Material-module';
import { FormDataService } from '../../../../services/form-data.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-speaking-engagements',
  standalone: true,
  imports: [
    MaterialModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './speaking-engagements.component.html',
  styleUrls: ['./speaking-engagements.component.scss']
})
export class SpeakingEngagementsComponent implements OnInit {
  speakingEngagementsFormGroup!: FormArray<FormGroup>;
  parentFormGroup!: FormGroup;

  eventTypes = ['Conference', 'Workshop', 'Webinar', 'Meetup', 'Panel Discussion', 'Keynote', 'Training', 'Other'];

  constructor(private formDataService: FormDataService) {
    this.parentFormGroup = this.formDataService.formData;
  }

  ngOnInit() {
    this.speakingEngagementsFormGroup = this.parentFormGroup.get('speakingEngagements') as FormArray<FormGroup>;
  }

  deleteSpeakingEngagement(index: number) {
    this.speakingEngagementsFormGroup.removeAt(index);
  }

  addSpeakingEngagement() {
    const newSpeakingEngagement = new FormGroup({
      eventName: new FormControl('', [Validators.required]),
      eventType: new FormControl('', [Validators.required]),
      topic: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      eventDate: new FormControl('', [Validators.required]),
      location: new FormControl('', [Validators.required]),
      organizer: new FormControl(''),
      audienceSize: new FormControl(null),
      duration: new FormControl(''),
      presentationUrl: new FormControl(''),
      videoUrl: new FormControl(''),
      tags: new FormControl([]),
      isKeynote: new FormControl(false)
    });
    this.speakingEngagementsFormGroup.push(newSpeakingEngagement);
  }
}
