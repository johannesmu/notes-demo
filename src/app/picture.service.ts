import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { DataService } from '../app/data.service';
import { Platform } from '@ionic/angular';
import 'firebase/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PictureService {
  // camera options
  private options: CameraOptions = {
    quality: 50,
    allowEdit: false,
    correctOrientation: true,
    saveToPhotoAlbum: false,
    encodingType: this.camera.EncodingType.JPEG,
    sourceType: this.camera.PictureSourceType.CAMERA,
    destinationType: this.camera.DestinationType.DATA_URL
  }

  public downloadURL: Observable<string>;
  private uid:string;

  constructor(
    private afStorage: AngularFireStorage,
    private dataService: DataService,
    private camera: Camera,
    private platform: Platform
  ) 
  { 
    this.uid = this.dataService.getUid();
  }

  takePicture()  {
    return new Promise( (resolve,reject) => {
      this.camera.getPicture(this.options).then((imageData) => {
        this.uploadImage( imageData )
          .then( (imgUrl) => {
            resolve( imgUrl );
          });
      })
      .catch((err) => {
        reject( err );
      });
    })
  }

  uploadImage( data ) {
    return new Promise( (resolve,reject) => {
      // before upload works, be sure to setup the "storage" section in your firebase
      // create a name for the file
      const ts = new Date().getTime();
      const fileName = `image_${ts}.jpg`;
      // create a path to store the file
      const filePath = `uploads/photos/${this.uid}/${fileName}`;
      let ref = this.afStorage.ref(filePath);
      // create a filestring for image
      const image = `data:image/jpeg;base64,${data}`;
      const task = ref.putString( image, 'data_url' );
      task.snapshotChanges().pipe(
        finalize( () => { 
          this.downloadURL = ref.getDownloadURL();
          this.downloadURL.subscribe( url => resolve(url) );
        })
      ).subscribe();
    });
  }

  deleteImage( url ) {
    return this.afStorage.storage.refFromURL( url ).delete();
  }
}
