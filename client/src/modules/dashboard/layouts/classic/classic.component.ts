import { Component } from '@angular/core';
import { userData } from '../../data';
import { IUserData } from '../../types';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-classic',
  templateUrl: './classic.component.html',
  styleUrls: ['./classic.component.scss']
})
export class ClassicComponent {
  userData : IUserData  = userData;

  constructor(private sanitizer: DomSanitizer) { 
    this.userData.profilePicture = this.sanitizer.bypassSecurityTrustResourceUrl(this.userData.profilePicture as string);
  }
}
