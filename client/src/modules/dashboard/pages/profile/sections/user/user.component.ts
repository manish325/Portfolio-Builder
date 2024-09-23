import { Component, OnInit } from '@angular/core';
import { educationDetailsFormGrourp, experienceDetailsFormGrourp, languageSchema, userProfileSchema } from 'src/modules/dashboard/schema';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FileItem, FileUploader, ParsedResponseHeaders } from 'ng2-file-upload';
import { DashboardService } from 'src/modules/dashboard/dashboard.service';
import { IEducation, IExperience, ILanguage, IUserData } from 'src/modules/dashboard/types';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  userDetailsFormGroup: FormGroup;
  basicDetailsFormGroup!: FormGroup;
  socialLinksFormGroup!: FormGroup;
  educationDetailsFormGroup !: FormArray<FormGroup>;
  experienceDetailsFormGroup !: FormArray<FormGroup>;
  languageDetailsFormArray !: FormArray<FormGroup>;
  public uploader: FileUploader = new FileUploader({
    url: '',
    method: 'POST',
    itemAlias: 'file',
    autoUpload: false,  // Upload only when the user triggers it
    allowedFileType: ['image', 'pdf'], // Limit file types (optional)
  });
  fileUrl !: string;
  userData !: IUserData;

  constructor(
    private fb: FormBuilder,
    private dashboardService: DashboardService
  ) {
    this.userDetailsFormGroup = this.fb.group(userProfileSchema);
    this.basicDetailsFormGroup = this.userDetailsFormGroup.get('basicDetails') as FormGroup;
    this.socialLinksFormGroup = this.userDetailsFormGroup.get('socialLinks') as FormGroup;
    this.educationDetailsFormGroup = this.userDetailsFormGroup.get('educationDetails') as FormArray<FormGroup>;
    this.experienceDetailsFormGroup = this.userDetailsFormGroup.get('experienceDetails') as FormArray<FormGroup>;
    this.languageDetailsFormArray = this.userDetailsFormGroup.get('languageDetails') as FormArray<FormGroup>;


    this.uploader.onAfterAddingFile = (file: FileItem) => {
      this.basicDetailsFormGroup.get('profilePicture')?.setValue(file.file);
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.fileUrl = e.target.result;
      };
      reader.readAsDataURL(file._file);
    };
  }

  ngOnInit(): void {
    this.dashboardService.getUser().subscribe(user => {
      this.userData = user;
      this.patchUserData();
    })
  }

  submit() {
    if (this.userDetailsFormGroup.valid) {
      console.log('Form Submitted', this.userDetailsFormGroup.value);
    } else {
      console.log('Form is invalid');
    }
  }

  addEducation() {
    const newEducation = new FormGroup({
      school: new FormControl(''),
      degree: new FormControl(''),
      fieldOfStudy: new FormControl(''),
      startDate: new FormControl(''),
      endDate: new FormControl(''),
      location: new FormControl(''),
      description: new FormControl('')
    });
    this.educationDetailsFormGroup.push(newEducation);
  }

  addExperience() {
    const newExperience = new FormGroup({
      title: new FormControl(''),
      company: new FormControl(''),
      location: new FormControl(''),
      startDate: new FormControl(''),
      endDate: new FormControl(''),
      description: new FormControl('')
    })
    this.experienceDetailsFormGroup.push(newExperience);
  }

  addLanguage() {
    const newLanguage = new FormGroup({
      language: new FormControl('', [Validators.required]),
      proficiency: new FormControl('', [Validators.required])
    })
    this.languageDetailsFormArray.push(newLanguage);
  }

  formatLabel(value: number): string {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return `${value}`;
  }

  changeProficiency(event: any, index: number) {
    const proficiencyFormField = this.languageDetailsFormArray.controls[index].get('proficiency');
    proficiencyFormField?.setValue(event.target.value);
  }

  removeProfilePic() {
    this.uploader.clearQueue();
    this.basicDetailsFormGroup.get('profilePicture')?.setValue(null);
  }

  patchUserData() {
    this.userDetailsFormGroup.patchValue(this.userData);
    this.fileUrl = this.userData.profilePicture || '';
    this.basicDetailsFormGroup.get('profilePicture')?.setValue(this.userData.profilePicture);
    this.basicDetailsFormGroup.get('name')?.setValue(this.userData.name);
    this.basicDetailsFormGroup.get('email')?.setValue(this.userData.email);
    this.basicDetailsFormGroup.get('phone')?.setValue(this.userData.phone);
    this.basicDetailsFormGroup.get('address')?.setValue(this.userData.address);
    this.basicDetailsFormGroup.get('profileSummary')?.setValue(this.userData.profileSummary);

    this.socialLinksFormGroup.get('github')?.setValue(this.userData.github);
    this.socialLinksFormGroup.get('linkedin')?.setValue(this.userData.linkedin);

    this.userData.education.forEach((education: IEducation, i: number) => {
      this.educationDetailsFormGroup.controls.push()
      this.educationDetailsFormGroup.controls[i].patchValue({
        ...education,
        startDate: new Date(education.startDate),
        endDate: new Date(education.endDate)
      });
    });

    this.userData.experience.forEach((experience: IExperience, i: number) => {
      this.experienceDetailsFormGroup.controls.push();
      this.experienceDetailsFormGroup.controls[i].patchValue({
        ...experience,
        startDate: new Date(experience.startDate),
        endDate: new Date(experience.endDate)
      })
    });

    this.userData.languages.forEach((language: ILanguage, i: number) => {
      this.languageDetailsFormArray.controls.push();
      this.languageDetailsFormArray.controls[i].patchValue(language)
    })

    console.log("Logging user from patch value : ", this.userData);
  }

  // formatUserDetails() : IUserData {
  //   return {
  //     ...this.basicDetailsFormGroup,
  //     ...this.socialLinksFormGroup,
  //     education : this.educationDetailsFormGroup.value,
  //     experience : this.experienceDetailsFormGroup.value,
  //     languages : 
  //   }
  // }
}
