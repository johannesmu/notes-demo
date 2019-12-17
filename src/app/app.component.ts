import { Component } from '@angular/core';
import { Subscription } from 'rxjs';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AuthService } from '../app/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    }
  ];
  private user: any;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authservice: AuthService
  )
  {
    this.initializeApp();
    this.initializeNavigation();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  initializeNavigation() {
    this.authservice.authStatus.subscribe((userData) => {
      if (userData) {
        this.appPages = [
          {
            title: 'Home',
            url: '/notes',
            icon: 'home'
          }
        ];
        this.user = userData;
      }
      else {
        this.appPages = [
          {
            title: 'Sign In',
            url: '/signin',
            icon: 'log-in'
          }
        ];
        this.user = null;
      }
    })
  }
}
