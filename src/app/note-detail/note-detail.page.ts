import { Component, OnInit, Input } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { DataService } from '../data.service';
import { PictureService } from '../picture.service';


@Component({
  selector: 'app-note-detail',
  templateUrl: './note-detail.page.html',
  styleUrls: ['./note-detail.page.scss'],
})
export class NoteDetailPage implements OnInit {
  @Input() name: string;
  @Input() date: Date;
  @Input() note: string;
  @Input() id: string;
  @Input() image: string;

  private detailForm: FormGroup;
  private edited: boolean = false;

  constructor( 
    private modal: ModalController, 
    private formBuilder: FormBuilder, 
    private data: DataService,
    private alert: AlertController,
    private picture: PictureService
  ) {}

  ngOnInit() {
    this.detailForm = this.formBuilder.group({
      name: [this.name, [Validators.required, Validators.minLength(3) ] ],
      note: [this.note, [Validators.required, Validators.minLength(5) ] ]
    });
    this.detailForm.valueChanges.subscribe( (formData) => {
      this.edited = true;
    });
  }

  save() {
    let data = {
      name: this.detailForm.controls.name.value,
      note: this.detailForm.controls.note.value,
      date: this.date,
      id: this.id
    }
    this.modal.dismiss(data);
  }

  close() {
    this.modal.dismiss();
  }

  delete() {
    this.data.deleteNote( this.id );
    this.modal.dismiss();
  }

  async showDeleteAlert( name ) {
    const confirm = await this.alert.create({
      header: 'Confirm deletion of note:',
      message: `Are you sure you want to delete ${name}?`,
      buttons: [
        {
          text: 'OK',
          role: 'confirm'
        }, 
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ],
      backdropDismiss: false
    });
    confirm.onDidDismiss().then(( response ) => {
      if( response.role == 'confirm' ) {
        this.delete();
        this.modal.dismiss();
      }
    });
    await confirm.present();
  }
}
