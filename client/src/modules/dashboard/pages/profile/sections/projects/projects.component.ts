import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FileItem, FileUploader, ParsedResponseHeaders } from 'ng2-file-upload';
import { FilePickerAdapter } from 'ngx-awesome-uploader';
import { NgxFileDropEntry } from 'ngx-file-drop';
import { projectSchema } from 'src/modules/dashboard/schema';
import { cloneDeep } from "lodash";
import rfdc from "rfdc";
const deepClone = rfdc();
declare module lodash { }

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  projectFormArray !: FormArray<FormGroup>;
  projectFormGroup !: FormGroup;
  technologiesFormArray !: FormArray<FormGroup>;
  skillsFormArray !: FormArray<FormGroup>;
  mediaFormArray !: FormControl<File[]>;
  fileAdapter !: FilePickerAdapter;
  public uploader: FileUploader = new FileUploader({
    url: '',
    method: 'POST',
    itemAlias: 'file',
    autoUpload: false,  // Upload only when the user triggers it
    allowedFileType: ['image', 'pdf'], // Limit file types (optional)
  });

  constructor(private fb: FormBuilder) {
    this.projectFormGroup = fb.group(projectSchema);
    this.projectFormArray = new FormArray([this.projectFormGroup]);
    this.technologiesFormArray = this.projectFormGroup.get('technologies') as FormArray<FormGroup>;
    this.skillsFormArray = this.projectFormGroup.get('skills') as FormArray<FormGroup>;
    this.mediaFormArray = this.projectFormGroup.get('media') as FormControl<File[]>;

    this.uploader.onAfterAddingFile = (file: FileItem) => {
      const previousFiles = this.mediaFormArray.value;
      const newFiles = [...previousFiles, file.file];
      this.mediaFormArray.setValue(newFiles as File[]);
    };
  }

  ngOnInit(): void {
  }

  onFileSelect(event: Event) {
    const files = (event.target as HTMLInputElement).files;
    this.mediaFormArray.setValue(Array.from(files as FileList));
  }

  public dropped(files: NgxFileDropEntry[], group: FormGroup): void {
    const fileArray: File[] = [];
    for (const droppedFile of files) {
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          fileArray.push(file);
          group.get('media')?.setValue(fileArray);
        });
      }
    }
  }

  onUploadSuccess(event: Event) {

  }

  onUploadFail(event: Event) {

  }

  removeFile(file: File) {
    const files = this.mediaFormArray.value;
    const index = files.indexOf(file);
    if (index > -1) {
      files.splice(index, 1);
      this.mediaFormArray.setValue(files);
    }
  }

  addProject() {
    const newProject = this.createProjectFormGroup();
    this.projectFormArray.push(newProject);
  }

  createProjectFormGroup(): FormGroup {
    return new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      startDate: new FormControl('', [Validators.required]),
      endDate: new FormControl('', [Validators.required]),
      githubLink: new FormControl(''),
      liveLink: new FormControl(''),
      media: new FormControl([]),
      technologies: new FormArray([new FormGroup({
        techName: new FormControl('', [Validators.required]),
        projects: new FormControl([]),
        certificates: new FormControl([])
      })]),
      skills: new FormArray([new FormGroup({
        title: new FormControl('', [Validators.required]),
        experience: new FormControl(''),
        proficiency: new FormControl(''),
        certificates: new FormArray([new FormGroup({
          certificateName: new FormControl(''),
          issuingOrganization: new FormControl(''),
          issueDate: new FormControl(null, [Validators.required]),
          expirationDate: new FormControl(null, [Validators.required]),
          credentialUrl: new FormControl('', [Validators.required]),
          description: new FormControl('', [Validators.required]),
          type: new FormControl('', [Validators.required]),
          status: new FormControl('', [Validators.required]),
          skills: new FormControl([]),
          technologies: new FormControl([])
        })])
      })])
    });
  }

  getTechnologies(group: FormGroup): FormArray {
    return group.get('technologies') as FormArray;
  }
  
  getSkills(group: FormGroup): FormArray {
    return group.get('skills') as FormArray;
  }

  getCertificates(group: AbstractControl): FormArray {
    return group.get('certificates') as FormArray;
  }
}
