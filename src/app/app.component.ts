import { Component } from '@angular/core';

import { Platform, MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AngularFireAuth } from '@angular/fire/auth';
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

  public user: any;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private afAuth: AngularFireAuth,
    private authService: AuthService,
    private menuCtrl: MenuController
  ) {
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
    this.afAuth.authState.subscribe( (data) => {
      if (data) {
        this.appPages = [
          {
            title: 'Home',
            url: '/notes',
            icon: 'home'
          }
        ];
        this.user = data;
      } else {
        this.appPages = [
          {
            title: 'Sign In / Sign Up',
            url: '/signin',
            icon: 'log-in'
          }
        ];
        this.user = null;
      }
    });
  }

  signOut() {
    this.authService.signOut()
    .then( (res) => {
      this.menuCtrl.close()
    })
    .catch( (error) => {})
  }
}
