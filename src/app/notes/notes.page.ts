import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { ModalController } from '@ionic/angular';
import { AddPage } from '../add/add.page';
import {Note} from '../../models/note.interface';


@Component({
  selector: 'app-notes',
  templateUrl: './notes.page.html',
  styleUrls: ['./notes.page.scss'],
})
export class NotesPage implements OnInit {
  public notes: Array<Note> = new Array();
  constructor( private data: DataService, private modal: ModalController ) { }

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

  async getNotes() {
    this.data.notes$.subscribe((data) => {
      console.log(data);
      this.notes = data;
    });
  }

  getNoteDetail(id) {
    console.log(id);
  }
}
