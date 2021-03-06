import { Component, ViewContainerRef } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { environment } from '../environments/environment';
import * as version from '../version.GENERATED';
import { HeaderService } from './services/header.service';
// import { } from '../version.GENERATED';

@Component({
  selector: 'general-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],

})
export class GeneralAppComponent {
  private viewContainerRef: ViewContainerRef;
  routerSubscription: Subscription;
  headerSubscription: Subscription;
  // Even though we update this from headerService, we still want to set default value to avoid pop-in.
  public headerName: string = environment.appConstants.serviceName;


  public constructor(viewContainerRef: ViewContainerRef, private router: Router, private header: HeaderService) {
    // You need this small hack in order to catch application root view container ref
    this.viewContainerRef = viewContainerRef;
  }


  ngOnInit() {
    this.routerSubscription = this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd)
      ).subscribe(event => {
        document.body.scrollTop = 0;
      });

      const prefix = environment.appConstants.serviceName;
      this.headerSubscription = this.header.title.subscribe(title => {
        this.headerName = title;
      });

      version.success
            ? console.log('%c' + version.message, 'color: #036; font-size: 20px;')
            : console.error(version.message);
  }

  ngOnDestroy() {
    // note - if we add any more subscriptions, refactor to a takeUntil()
    this.routerSubscription.unsubscribe();
    this.headerSubscription.unsubscribe();
  }
}
