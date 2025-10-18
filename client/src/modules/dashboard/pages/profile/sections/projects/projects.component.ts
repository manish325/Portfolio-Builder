import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FileItem, FileUploader, ParsedResponseHeaders } from 'ng2-file-upload';
import { FilePickerAdapter } from 'ngx-awesome-uploader';
import { NgxFileDropEntry } from 'ngx-file-drop';
import { projectDetailsControl } from 'src/modules/dashboard/schema';
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
    this.projectFormGroup = projectDetailsControl;
    this.projectFormArray = this.projectFormGroup.get('projects') as FormArray<FormGroup>;
    
    // Initialize with one project if empty
    if (this.projectFormArray.length === 0) {
      this.addProject();
    }

    this.uploader.onAfterAddingFile = (file: FileItem) => {
      // Handle file upload for the current project
      const currentProject = this.projectFormArray.at(this.projectFormArray.length - 1);
      const mediaArray = currentProject.get('media') as FormControl<File[]>;
      const previousFiles = mediaArray.value || [];
      const newFiles = [...previousFiles, file.file];
      mediaArray.setValue(newFiles as File[]);
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


  addProject() {
    const newProject = this.createProjectFormGroup();
    this.projectFormArray.push(newProject);
  }

  createProjectFormGroup(): FormGroup {
    return new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      startDate: new FormControl('', [Validators.required]),
      endDate: new FormControl(''),
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
        certificates: new FormControl([])
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

  deleteProject(index: number) {
    if (this.projectFormArray.length > 1) {
      this.projectFormArray.removeAt(index);
    }
  }

  addTechnology(group: FormGroup) {
    const technologies = group.get('technologies') as FormArray;
    technologies.push(new FormGroup({
      techName: new FormControl('', [Validators.required]),
      projects: new FormControl([]),
      certificates: new FormControl([])
    }));
  }

  removeTechnology(group: FormGroup, index: number) {
    const technologies = group.get('technologies') as FormArray;
    if (technologies.length > 1) {
      technologies.removeAt(index);
    }
  }

  getMediaPreview(media: any): string {
    if (media && media.url) {
      return media.url;
    }
    return '';
  }

  isImage(media: any): boolean {
    if (media && media.type) {
      return media.type.startsWith('image/');
    }
    if (media && media.name) {
      const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp'];
      return imageExtensions.some(ext => media.name.toLowerCase().endsWith(ext));
    }
    return false;
  }

  isVideo(media: any): boolean {
    if (media && media.type) {
      return media.type.startsWith('video/');
    }
    if (media && media.name) {
      const videoExtensions = ['.mp4', '.avi', '.mov', '.wmv', '.flv', '.webm'];
      return videoExtensions.some(ext => media.name.toLowerCase().endsWith(ext));
    }
    return false;
  }

  removeFile(media: any, group: FormGroup) {
    const mediaArray = group.get('media') as FormControl;
    const currentMedia = mediaArray.value || [];
    const updatedMedia = currentMedia.filter((m: any) => m !== media);
    mediaArray.setValue(updatedMedia);
  }
}
