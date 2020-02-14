import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  private displayPreview: boolean;
  private listDirection: boolean;
  private searchDescriptions: boolean;
  constructor( private settings: SettingsService ) { }

  ngOnInit() {
    this.settings.displayPreview.subscribe( (value) => this.displayPreview = value );
    this.settings.listDirection.subscribe( (value) => this.listDirection = value );
    this.settings.searchDescriptions.subscribe( (value) => this.searchDescriptions = value );
  }

  toggleDisplayPreview() {
    this.settings.displayPreview.next( this.displayPreview );
  }
}
