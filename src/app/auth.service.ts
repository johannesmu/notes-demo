import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private afAuth: AngularFireAuth) { }

  signUp( email, password ) {
    return new Promise( (resolve, reject) => {
      this.afAuth.auth.createUserWithEmailAndPassword( email, password )
      .then( ( response ) => {
        resolve( response );
      })
      .catch( (error) => {
        reject( error );
      });
    });
  }

  signIn( email, password ) {
    return new Promise( (resolve, reject) => {
      this.afAuth.auth.signInWithEmailAndPassword( email, password )
      .then( (response) => {
        resolve( response );
      } )
      .catch( (error) => {
        reject( error );
      });
    });
  }
}
