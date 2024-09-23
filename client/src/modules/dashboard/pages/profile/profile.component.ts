import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { INavigationOptions } from '../../types';
import { profilePageNavigation } from '../../data';
import { DashboardService } from '../../dashboard.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  isRouted : boolean = false;
  navigationItems : INavigationOptions[] = profilePageNavigation;
  currentNav:INavigationOptions = profilePageNavigation[0];
  constructor(private router : Router, private dashboardService : DashboardService) {}

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentNav = this.navigationItems.find(item => item.path === event.url.split('/')[event.url.split('/').length - 1])!;
      }
    })
  }
  openProfileForm() {}

  logout() {
    this.dashboardService.logout();
  }

    
}
