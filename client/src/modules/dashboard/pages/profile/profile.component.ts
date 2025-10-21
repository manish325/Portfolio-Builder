import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { INavigationOptions, IStep, IUserData } from '../../types';
import { portfolioFormSteps, profilePageNavigation } from '../../data';
import { DashboardService } from '../../dashboard.service';
import { StepperComponent } from '../../../../common/stepper/stepper.component';
import { MaterialModule } from '../../../../shared/MaterialModule/Material-module';
import { ChatComponent } from '../../../../shared/chat/chat.component';
import { ChatButtonComponent } from '../../../../shared/chat-button/chat-button.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  isRouted : boolean = false;
  navigationItems : INavigationOptions[] = profilePageNavigation;
  user !: IUserData;
  currentNav:INavigationOptions = profilePageNavigation[0];
  applicationSteps : IStep[] = portfolioFormSteps as IStep[];
  constructor(private router : Router, private dashboardService : DashboardService) {
    this.dashboardService.getUser().subscribe({
      next : (user : IUserData) => {
        this.user = user;
        console.log("Logging the getted user : ", user);
      }
    })
  }

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentNav = this.navigationItems.find(item => item.path === event.url.split('/')[event.url.split('/').length - 1])!;
      }
    })
  }
  openProfileForm() {}

  goToDashboard() {
    this.router.navigate(['/dashboard']);
  }

  logout() {
    this.dashboardService.logout();
  }

    
}
