import { Component, OnInit } from '@angular/core';
import { TEMPLATE_PATHS, userData } from '../../data';
import { IUserData } from '../../types';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { DashboardService } from '../../dashboard.service';

@Component({
  selector: 'app-classic',
  templateUrl: './classic.component.html',
  styleUrls: ['./classic.component.scss']
})
export class ClassicComponent {
  userData !: IUserData;
  htmlContent: any;

  constructor(
    private sanitizer: DomSanitizer,
    private dashboardService: DashboardService
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

  loadTemplate() {
    this.dashboardService.getTemplate(TEMPLATE_PATHS.CLASSIC).subscribe(template => {
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
