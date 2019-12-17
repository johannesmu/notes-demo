import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NoteAddPage } from './note-add.page';

const routes: Routes = [
  {
    path: '',
    component: NoteAddPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NoteAddPageRoutingModule {}
