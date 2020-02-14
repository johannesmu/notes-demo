import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  public displayPreview = new BehaviorSubject<boolean>( true );
  public listDirection = new BehaviorSubject<boolean>( true );
  public searchDescriptions = new BehaviorSubject<boolean>( false );

  constructor() { }

}
