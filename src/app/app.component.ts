import { Component } from '@angular/core';

import { Platform, MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';


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

  user:any;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private afAuth: AngularFireAuth,
    private router: Router
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
    this.afAuth.authState.subscribe(( user ) => {
      if( user ) {
        this.appPages = [
          {title: 'Notes' , url: '/notes', icon: 'home'},
          {title: 'Settings' , url: '/settings', icon: 'settings'}
        ]
        this.user = user;
      }
      else {
        this.appPages = [
          {title: 'Sign In', url: '/signin', icon: 'log-in'}
        ]
        this.user = null;
      }
    })
  }

  signOut() {
    this.afAuth.auth.signOut().then(()=>{
      // redirect user to signin page
      this.router.navigate(['/signin'])
    })
  }
}
