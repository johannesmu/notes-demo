import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Setting } from '../models/setting.interface';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private defaultSettings: Setting = {displayPreview: true, listDirection: true, searchDescriptions: false };
  public settings = new BehaviorSubject<Setting> ( this.defaultSettings );
  public displayPreview = new BehaviorSubject<boolean>( true );
  public listDirection = new BehaviorSubject<boolean>( true );
  public searchDescriptions = new BehaviorSubject<boolean>( false );

  constructor() { }

  loadSettings() {
    // read and set settings
  }

  updateSettings() {}

  resetSettings() {
    // return to default values
  }

  saveSettings() {
    // store settings
  }

}
