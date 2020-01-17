import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Subscription, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Note } from '../models/note.interface';
import { AngularFireAuth } from '@angular/fire/auth';



@Injectable({
  providedIn: 'root'
})
export class DataService {
  private notesCollection: AngularFirestoreCollection<Note>;
  // notes$: Observable<Note[]>;
  public notes$ = new BehaviorSubject<Note[]>([]);
  private uid: string;
  private authStatus: Subscription;
  private ncSub: Subscription;

  constructor(private afs: AngularFirestore, private afauth: AngularFireAuth) {
    // get the user auth status
    this.authStatus = afauth.authState.subscribe((user) => {
      if (user) {
        // get the user id
        this.uid = user.uid;
        // create path
        const path = `notes/${this.uid}/usernotes`;
        // set the collection
        this.notesCollection = afs.collection<Note>(path);
        // this.notes$ = this.getNotes();
        this.ncSub = this.getNotes().subscribe((data) => {
          this.notes$.next(data);
        });
      }
      else{
        this.ncSub.unsubscribe();
      }
    });
  }

  addNote(data: Note) {
    this.notesCollection.add(data);
  }

  getNotes() {
    // this function retuns an Observable
    return this.notesCollection.snapshotChanges()
      .pipe( map(actions => actions.map(a => {
          const data = a.payload.doc.data() as Note;
          const id = a.payload.doc.id;
          return { id, ...data };
        }))
      );
  }

  updateNote( note ) {
    this.notesCollection.doc( note.id ).update( {name: note.name, note: note.note });
  }

  deleteNote( id ) {
    this.notesCollection.doc( id ).delete();
  }
}
