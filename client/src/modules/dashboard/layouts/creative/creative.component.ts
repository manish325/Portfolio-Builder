import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { TEMPLATE_PATHS, userData } from '../../data';
import { IUserData } from '../../types';
import { DashboardService } from '../../dashboard.service';

@Component({
  selector: 'app-creative',
  templateUrl: './creative.component.html',
  styleUrls: ['./creative.component.scss']
})
export class CreativeComponent {
  userData !: IUserData;
  selectedTab : string = 'profile';
  currentYear = new Date().getFullYear();
  htmlContent :any;

  constructor(
    private sanitizer: DomSanitizer, 
    private dashboardService : DashboardService
  ) { 
    dashboardService.getUser().subscribe(user => {
      this.userData = user;
      (window as any).userData = user;
    })
    this.loadTemplate();
    setTimeout(() => {
      (window as any).main();
    }, 1500)
  }

  getStars(proficiency : number) {
    return Array(proficiency).fill(0);
  }

  loadTemplate() {
    this.dashboardService.getTemplate(TEMPLATE_PATHS.CREATIVE).subscribe(template => {
      this.htmlContent = this.sanitizer.bypassSecurityTrustHtml(this.extractScripts(template));
    }
    )
  }

  extractScripts(html: string): string {
    const scriptRegex = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;
    const scripts = html.match(scriptRegex);
    return html.replace(scriptRegex, ''); 
  }

}
