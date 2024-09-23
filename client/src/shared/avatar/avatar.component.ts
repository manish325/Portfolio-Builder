import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
  standalone : true,
  imports : [CommonModule]
})
export class AvatarComponent implements OnInit {
  @Input() name: string = '';
  @Input() imageUrl: string | null | SafeResourceUrl = null;
  @Input() size: number = 50;

  constructor(
    private sanitizer : DomSanitizer
  ){}

  get initials(): string {
    if (!this.name) return '';
    const nameParts = this.name.split(' ');
    const initials = nameParts.map(part => part.charAt(0).toUpperCase());
    return initials.length > 1 ? `${initials[0]}${initials[1]}` : initials[0];
  }

  ngOnInit(): void {
    if(this.imageUrl) {
      this.imageUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.imageUrl as string);
    }
  }
}
