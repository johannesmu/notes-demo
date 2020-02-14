import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { ModalController, LoadingController } from '@ionic/angular';
import { AddPage } from '../add/add.page';
import { Note } from '../../models/note.interface';
import { NoteDetailPage } from '../note-detail/note-detail.page';
import { ReplaySubject, Subscription } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { SettingsService } from '../settings.service';


@Component({
  selector: 'app-notes',
  templateUrl: './notes.page.html',
  styleUrls: ['./notes.page.scss'],
})
export class NotesPage implements OnInit {

  public notes: Array<Note> = new Array();
  private notesData: Array<Note> = new Array();

  private loadingState: ReplaySubject<boolean> = new ReplaySubject();
  private notesSub: Subscription;
  private authSub: Subscription;
  private displayPreview: boolean = true;

  constructor( 
    private data: DataService, 
    private modal: ModalController,
    private loading: LoadingController,
    private afAuth: AngularFireAuth,
    private settings: SettingsService
    ) { }

  ngOnInit() {
    // check auth status
    this.afAuth.authState.subscribe( (user) => {
      if ( user ) {
        this.getNotes();
      }
      else{
        this.notesSub.unsubscribe();
        this.authSub.unsubscribe();
      }
    });
    // get notes
    this.getNotes();
    // subscribe to settings for displayPreview
    //this.settings.displayPreview.subscribe( (value) => { this.displayPreview = value } );
  }

  async addNote() {
    const addModal = await this.modal.create({ component: AddPage });
    addModal.onDidDismiss()
      .then( (response) => {
        if ( response.data ) {
          // create note
          this.data.addNote( response.data );
          console.log( response.data );
        }
      })
      .catch( (error) => {
        console.log(error);
      });
    addModal.present();
  }

  getNotes() {
    // set loading state to true to show spinner
    this.loadingState.next(true);
    // show loading spinner
    this.showLoading();
    this.notesSub = this.data.notes$.subscribe((data) => {
      // store original data in notesData
      this.notesData = data;
      // store notes to display in notes
      this.notes = data;
      this.loadingState.next(false);
    });
  }

  filterNotes( event ) {
    let searchTerm = event.target.value.toLowerCase();
    this.notes = this.notesData.filter( (note) => {
      if ( note.name.toLowerCase().indexOf( searchTerm ) !== -1 ) {
        return note;
      }
    });
  }

  restoreNotes() {
    this.notes = this.notesData;
  }

  async getNoteDetail( note ) {
    const detailModal = await this.modal.create({ component: NoteDetailPage, componentProps: {
      "name": note.name,
      "note": note.note,
      "date": note.date,
      "id": note.id,
      "image" : (note.image) ? note.image : null
    } });
    detailModal.onDidDismiss()
      .then( (response) => {
        if ( response.data ) {
          // save note
          // console.log( response.data );
          this.data.updateNote( response.data );
        }
      })
      .catch( (error) => {
        console.log(error);
      });
    detailModal.present();
  }

  async showLoading() {
    const loadingIndicator = await this.loading.create({
      spinner: "bubbles"
    });
    this.loadingState.subscribe( (value) => {
      if( value == true ) {
        loadingIndicator.present();
      }
      else{
        loadingIndicator.dismiss();
      }
    });
  }
}
