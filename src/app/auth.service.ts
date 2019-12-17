import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authStatus = new BehaviorSubject(null);

  constructor( private afAuth: AngularFireAuth) {  }

  signIn( email, password ) {
    this.afAuth.auth.signInWithEmailAndPassword( email, password )
    .then( (user) => {
      this.authStatus.next( user );
    });
  }

  signUp( email, password ) {
    this.afAuth.auth.createUserWithEmailAndPassword( email, password )
    .then( ( user ) => {
      this.authStatus.next( user );
    });
  }

  signOut() {
    this.afAuth.auth.signOut()
    .then( () => {

    })
    .catch( () => {
      
    });
  }
}
