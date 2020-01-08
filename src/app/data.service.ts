import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable, Subscription } from 'rxjs';
import { Note } from '../models/note.interface';
import { AngularFireAuth } from '@angular/fire/auth';



@Injectable({
  providedIn: 'root'
})
export class DataService {
  private notesCollection: AngularFirestoreCollection<Note>;
  public notes:Observable<Note[]>;
  private uid:string;
  private authStatus:Subscription;

  constructor( private afs: AngularFirestore, private afauth: AngularFireAuth ) {
    // get the user auth status
    this.authStatus = afauth.authState.subscribe( (user) => {
      if( user ) {
        // get the user id
        this.uid = user.uid;
        // create path
        let path = `notes/${this.uid}/usernotes`;
        // set the collection
        this.notesCollection = afs.collection<Note>( path );
      }
    })
  }

  addNote( data: Note ) {
    this.notesCollection.add( data );
  }
}
