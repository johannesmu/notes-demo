import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { ModalController } from '@ionic/angular';
import { AddPage } from '../add/add.page';


@Component({
  selector: 'app-notes',
  templateUrl: './notes.page.html',
  styleUrls: ['./notes.page.scss'],
})
export class NotesPage implements OnInit {

  constructor( private data: DataService, private modal:ModalController ) { }

  ngOnInit() {
  }

  async addNote() {
    const addModal = await this.modal.create({ component: AddPage });
    addModal.onDidDismiss()
      .then( (response) => {
        if( response.data ) {
          // create note
          this.data.addNote( response.data );
        }
      })
      .catch( (error) => {
        console.log(error);
      });
    addModal.present();
  }
}
