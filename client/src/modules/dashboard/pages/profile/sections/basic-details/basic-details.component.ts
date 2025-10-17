import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FileItem, FileUploader } from 'ng2-file-upload';
import { userProfileSchema } from 'src/modules/dashboard/schema';
import { MaterialModule } from 'src/shared/MaterialModule/Material-module';
import { SharedModule } from 'src/shared/SharedModule/shared.module';

@Component({
  selector: 'app-basic-details',
  standalone: true,
  imports: [
    SharedModule,
    MaterialModule
  ],
  templateUrl: './basic-details.component.html',
  styleUrl: './basic-details.component.scss'
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

  constructor() {
    this.basicDetailsFormGroup = userProfileSchema.get('basicDetails') as FormGroup;
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
    // Reset your form control or state if needed here
  }
}
