import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { userData } from '../../data';
import { IUserData } from '../../types';

@Component({
  selector: 'app-professional',
  templateUrl: './professional.component.html',
  styleUrls: ['./professional.component.scss']
})
export class ProfessionalComponent {
  userData : IUserData  = userData;

  constructor(private sanitizer: DomSanitizer) { 
    this.userData.profilePicture = this.sanitizer.bypassSecurityTrustResourceUrl(this.userData.profilePicture as string);
  }
}
