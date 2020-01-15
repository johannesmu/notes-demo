import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NoteDetailPage } from './note-detail.page';

describe('NoteDetailPage', () => {
  let component: NoteDetailPage;
  let fixture: ComponentFixture<NoteDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoteDetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NoteDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
