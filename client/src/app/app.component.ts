import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'client';
  constructor(private router: Router) {}

  ngOnInit() {
    // this.router.events.pipe(
    //   filter(event => event instanceof NavigationEnd)
    // ).subscribe(() => {
    //   const url = this.router.url;
    //   if (url.includes('#')) {
    //     const elementId = url.split('#')[1];
    //     const element = document.getElementById(elementId);
    //     if (element) {
    //       element.scrollIntoView({ behavior: 'smooth' });
    //     }
    //   }
    // });
  }
}
