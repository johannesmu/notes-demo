import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { DataService } from '../app/data.service';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class PictureService {
  // camera options
  private options: CameraOptions = {
    quality: 50,
    allowEdit: true,
    correctOrientation: true,
    saveToPhotoAlbum: false,
    encodingType: this.camera.EncodingType.JPEG,
    sourceType: this.camera.PictureSourceType.CAMERA,
    destinationType: this.platform.is('ios') ? this.camera.DestinationType.FILE_URI : this.camera.DestinationType.DATA_URL
  }

  constructor(
    private afStorage: AngularFireStorage,
    private dataService: DataService,
    private camera: Camera,
    private platform: Platform
  ) { }

  takePicture() {
    this.camera.getPicture(this.options).then((imageData) => {
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      console.log(base64Image);
      this.uploadImage( imageData );
    })
    .catch((err) => {
      console.log( err );
    });
  }

  uploadImage( data ) {
    console.log( this.dataService.getUid() );
    const file = data;
    const filePath = 'name-your-file-path-here';
    const task = this.afStorage.upload(filePath, file);
  }



}
