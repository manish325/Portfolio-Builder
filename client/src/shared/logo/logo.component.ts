import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-logo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss']
})
export class LogoComponent {
  @Input() size: 'small' | 'medium' | 'large' | 'xl' = 'medium';
  @Input() showText: boolean = true;
  @Input() variant: 'primary' | 'white' | 'dark' = 'primary';
  @Input() tagline: string = 'Grow Your Professional Identity';

  get sizeClass(): string {
    return `logo-${this.size}`;
  }

  get variantClass(): string {
    return `logo-${this.variant}`;
  }
}
