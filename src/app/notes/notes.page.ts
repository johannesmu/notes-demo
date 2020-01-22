import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { ModalController, LoadingController } from '@ionic/angular';
import { AddPage } from '../add/add.page';
import {Note} from '../../models/note.interface';
import { NoteDetailPage } from '../note-detail/note-detail.page';


@Component({
  selector: 'app-notes',
  templateUrl: './notes.page.html',
  styleUrls: ['./notes.page.scss'],
})
export class NotesPage implements OnInit {

  public notes: Array<Note> = new Array();
  private searchTerm: string = '';

  constructor( private data: DataService, private modal: ModalController, private loading: LoadingController ) { }

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
    this.showLoading();
    this.data.notes$.subscribe((data) => {
      this.loading.dismiss();
      this.notes = data;
    });
  }

  filterNotes( notes ) {
    const data = notes.filter( (note) => {
      if( note.name.indexOf(this.searchTerm) !== -1 ) {
        return note;
      }
    });
    console.log(data);
    return data;
  }

  updateSearch( event ) {
    this.searchTerm = event.target.value;
    this.notes = this.filterNotes( this.notes );
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
    const loader = await this.loading.create({
      showBackdrop: false, spinner: "bubbles"
    });
    await loader.present();
  }
}
