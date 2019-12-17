import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { SignupPage } from '../signup/signup.page';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {
  signInForm: FormGroup;
  constructor(
    private modal: ModalController,
    private authservice: AuthService,
    private formBuilder: FormBuilder
  ) 
  { }

  ngOnInit() {
    this.signInForm = this.formBuilder.group({
      email: [ '', [Validators.required, Validators.email ] ],
      password: [ '', [Validators.required, Validators.minLength(6) ] ]
    })
  }

  signIn() {
    const email = this.signInForm.controls.email.value;
    const password = this.signInForm.controls.password.value;
    this.authservice.signIn( email, password );
  }

  async signUp() {
    const signUpModal = await this.modal.create({
      component: SignupPage
    });
    signUpModal.onDidDismiss().then((response) => {
      // handle signup response
      if ( response.data ) {
        const data = response.data;
        this.authservice.signUp( data.email, data.password );
      }
    });
    await signUpModal.present();
  }
}
