import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SnackBarService } from 'src/services/snackbar/snackbar.service';
import { MatTabsModule } from '@angular/material/tabs';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatStepperModule} from '@angular/material/stepper';
import { MatNativeDateModule } from '@angular/material/core';
import { NgxFileDropModule } from 'ngx-file-drop';
import { FilePickerModule } from 'ngx-awesome-uploader';
import { FileUploadModule } from 'ng2-file-upload';
import {MatSliderModule} from "@angular/material/slider";
import {MatSelectModule} from "@angular/material/select";
import {MatChipEditedEvent, MatChipInputEvent, MatChipsModule} from '@angular/material/chips';
// import { AvatarModule } from 'ngx-avatar';
// import { NzAvatarModule } from 'ng-zorro-antd/avatar';
// import { NzButtonModule } from 'ng-zorro-antd/button';

@NgModule({
  imports: [
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatGridListModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatSnackBarModule,
    MatCheckboxModule,
    MatRadioModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatTabsModule,
    MatExpansionModule,
    MatProgressBarModule,
    MatDatepickerModule,
    MatStepperModule,
    MatNativeDateModule,
    FileUploadModule,
    MatSliderModule,
    MatSelectModule,
    MatChipsModule
    // NzAvatarModule,
    // NzButtonModule
    // AvatarModule
    // NgxFileDropModule
    // FilePickerModule
  ],
  providers : [
    SnackBarService
  ],
  exports: [
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatGridListModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatSnackBarModule,
    MatCheckboxModule,
    MatRadioModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatTabsModule,
    MatExpansionModule,
    MatProgressBarModule,
    MatDatepickerModule,
    MatStepperModule,
    MatNativeDateModule,
    FileUploadModule,
    MatSliderModule,
    MatSelectModule,
    MatChipsModule
    // NzAvatarModule,
    // NzButtonModule
    // AvatarModule
    // NgxFileDropModule,
    // FilePickerModule
  ]
})
export class MaterialModule { }
