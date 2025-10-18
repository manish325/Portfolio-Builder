import { Component } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { FileItem, FileUploader } from 'ng2-file-upload';
import { MaterialModule } from 'src/shared/MaterialModule/Material-module';
import { SharedModule } from 'src/shared/SharedModule/shared.module';
import { FormDataService } from '../../../../services/form-data.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-basic-details',
  standalone: true,
  imports: [
    SharedModule,
    MaterialModule,
    CommonModule
  ],
  templateUrl: './basic-details.component.html',
  styleUrls: ['./basic-details.component.scss']
})
export class BasicDetailsComponent {
  basicDetailsFormGroup!: FormGroup;
  public uploader: FileUploader = new FileUploader({
    url: '',               // Set your upload URL here
    method: 'POST',
    itemAlias: 'file',
    autoUpload: false,     // Upload triggered manually
    allowedFileType: ['image', 'pdf'],  // Allowed file types
  });
  fileUrl!: string;

  constructor(private formDataService: FormDataService) {
    this.basicDetailsFormGroup = this.formDataService.formData.get('basicDetails') as FormGroup;
    this.uploader.onAfterAddingFile = (file: FileItem) => {
      // You can update your form control or state with the selected file here
      // For example, if you want to save the File object somewhere
      // Example: this.formGroup.get('profilePicture')?.setValue(file.file);

      // Create preview URL for the selected file
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.fileUrl = e.target.result;
      };
      reader.readAsDataURL(file._file);
    };
  }

  removeProfilePic() {
    this.uploader.clearQueue();
    this.fileUrl = '';   // Clear preview URL
    this.basicDetailsFormGroup.get('profilePicture')?.setValue(null);
  }

  resetForm() {
    this.basicDetailsFormGroup.reset();
    this.removeProfilePic();
  }

  saveForm() {
    if (this.basicDetailsFormGroup.valid) {
      console.log('Form data:', this.basicDetailsFormGroup.value);
      // TODO: Implement save functionality
      // You can emit an event or call a service here
    }
  }
}
