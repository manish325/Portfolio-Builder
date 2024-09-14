import { Component } from '@angular/core';
import { ILayout } from '../../types';
import { layouts } from '../../data';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent {

  selectedLayout : ILayout = layouts[0];

  constructor(
    private router: Router
  ) {}

  openProfileForm() {}
  changeLayout() {}
  selectLayout(layout : ILayout) {
    this.selectedLayout = layout;
    const navigationUrl = `/dashboard/${layout.path}`;
    this.router.navigate([navigationUrl]);


  }
  getStarted() {}

  layoutData : ILayout[] = layouts;
}
