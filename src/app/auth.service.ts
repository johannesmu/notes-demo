import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private afAuth: AngularFireAuth) {  }

  signIn( email, password ) {
    return new Promise( ( resolve, reject ) => {
      this.afAuth.auth.signInWithEmailAndPassword( email, password )
      .then( (user) => {
        resolve( user )
      })
      .catch( (error) => {
        reject( error )
      });
    });
  }

  signUp( email, password ) {
    return new Promise( ( resolve, reject ) => {
      this.afAuth.auth.createUserWithEmailAndPassword( email, password )
      .then( ( user ) => {
        resolve( user )
      })
      .catch( ( error ) => {
        reject( error )
      });
    });
  }

  signOut() {
    return new Promise( ( resolve, reject ) => {
      this.afAuth.auth.signOut()
      .then( () => {
        resolve( true )
      })
      .catch( ( error ) => {
        reject( false )
      });      
    })
    
  }
}
