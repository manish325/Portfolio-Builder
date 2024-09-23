import { Component, OnInit } from '@angular/core';
import { ILayout, IUserData } from '../../types';
import { layouts } from '../../data';
import { Router } from '@angular/router';
import { DashboardService } from '../../dashboard.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  selectedLayout: ILayout = layouts[0];
  user !: IUserData;
  showDrawer : boolean = false;

  constructor(
    private router: Router,
    private dashboardService: DashboardService
  ) {
    this.dashboardService.getUser().subscribe({
      next : (user : IUserData) => {
        this.user = user;
        console.log("Logging the getted user : ", user);
      }
    })
  }

  ngOnInit(): void {
    this.dashboardService.getUserData();
  }

  openProfileForm() { }
  changeLayout() { }

  selectLayout(layout: ILayout) {
    this.selectedLayout = layout;
    const navigationUrl = `/dashboard/${layout.path}`;
    this.router.navigate([navigationUrl]);
  }

  getProfilePicture() {
    return this.user?.profilePicture;
  }

  getStarted() { }

  logout() {
    this.dashboardService.logout();
  }

  layoutData: ILayout[] = layouts;
}
