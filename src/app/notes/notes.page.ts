import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { ModalController, LoadingController } from '@ionic/angular';
import { AddPage } from '../add/add.page';
import {Note} from '../../models/note.interface';
import { NoteDetailPage } from '../note-detail/note-detail.page';
import { BehaviorSubject, ReplaySubject } from 'rxjs';


@Component({
  selector: 'app-notes',
  templateUrl: './notes.page.html',
  styleUrls: ['./notes.page.scss'],
})
export class NotesPage implements OnInit {

  public notes: Array<Note> = new Array();
  private loadingState: ReplaySubject<boolean> = new ReplaySubject();
  constructor( 
    private data: DataService, 
    private modal: ModalController,
    private loading: LoadingController 
    ) { }

  ngOnInit() {
    // check auth status
    // get notes
    this.getNotes();
  }

  async addNote() {
    const addModal = await this.modal.create({ component: AddPage });
    addModal.onDidDismiss()
      .then( (response) => {
        if ( response.data ) {
          // create note
          this.data.addNote( response.data );
        }
      })
      .catch( (error) => {
        console.log(error);
      });
    addModal.present();
  }

  getNotes() {
    this.loadingState.next(true);
    // show loading
    this.showLoading();
    this.data.notes$.subscribe((data) => {
      this.notes = data;
      this.loadingState.next(false);
    });
  }

  async getNoteDetail( note ) {
    const detailModal = await this.modal.create({ component: NoteDetailPage, componentProps: {
      "name": note.name,
      "note": note.note,
      "date": note.date,
      "id": note.id
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
