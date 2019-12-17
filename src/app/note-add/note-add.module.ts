import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NoteAddPageRoutingModule } from './note-add-routing.module';

import { NoteAddPage } from './note-add.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NoteAddPageRoutingModule
  ],
  declarations: [NoteAddPage]
})
export class NoteAddPageModule {}
