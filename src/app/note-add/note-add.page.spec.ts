import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NoteAddPage } from './note-add.page';

describe('NoteAddPage', () => {
  let component: NoteAddPage;
  let fixture: ComponentFixture<NoteAddPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoteAddPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NoteAddPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
