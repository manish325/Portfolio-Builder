import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { userData } from '../../data';
import { IUserData } from '../../types';

@Component({
  selector: 'app-creative',
  templateUrl: './creative.component.html',
  styleUrls: ['./creative.component.scss']
})
export class CreativeComponent {
  userData : IUserData  = userData;
  selectedTab : string = 'profile';
  currentYear = new Date().getFullYear();

  constructor(private sanitizer: DomSanitizer) { 
    this.userData.profilePicture = this.sanitizer.bypassSecurityTrustResourceUrl(this.userData.profilePicture as string);
  }

  getStars(proficiency : number) {
    return Array(proficiency).fill(0);
  }

}
