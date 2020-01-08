import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { SignupPage } from '../signup/signup.page';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {
  signInForm: FormGroup;

  constructor(
    private modal: ModalController,
    private auth: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private toast: ToastController
  ) { }

  ngOnInit() {
    this.signInForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  signIn() {
    const email = this.signInForm.controls.email.value;
    const password = this.signInForm.controls.password.value;
    this.auth.signIn(email, password)
      .then((response) => {
        this.signInForm.reset();
        this.router.navigate(['/notes']);
      })
      .catch((error) => {
        this.handleSignInErrors(error);
      });
  }

  async signUp() {
    const signUpModal = await this.modal.create({
      component: SignupPage
    });
    signUpModal.onDidDismiss().then((response) => {
      if (response.data) {
        // handle signup response
        const email = response.data.email;
        const password = response.data.password;
        this.auth.signUp(email, password)
          .then((userData) => {
            // sign up successful
            this.router.navigate(['/notes']);
          })
          .catch((error) => {
            // handle errors
            console.log(error);
            this.handleSignUpErrors( error );
          });
      }
    });
    await signUpModal.present();
  }

  handleSignUpErrors(error) {
    switch ( error.code ) {
      case 'auth/email-already-in-use' :
        this.displayMessage('the email address cannot be used');
        break;
      case 'auth/invalid-email' :
        this.displayMessage('the email address is not valid');
        break;
      case 'auth/operation-not-allowed' :
        this.displayMessage('the sign up process does is not functional');
        break;
      case 'auth/weak-password' :
        this.displayMessage('the password is too weak');
        break;
      default:
        break;
    }
  }

  handleSignInErrors( error ) {
    switch ( error.code ) {
      case 'auth/invalid-email' :
        this.displayMessage('the email address is not valid');
        break;
      case 'auth/user-disabled' :
        this.displayMessage('the account has been disabled');
        break;
      case 'auth/user-not-found' :
        this.displayMessage('the credentials do not match our records');
        break;
      case 'auth/wrong-password' :
        this.displayMessage('cannot sign in due to wrong credentials');
        break;
      default:
        break;
    }
  }

  async displayMessage( msg ) {
    const openToast = await this.toast.create({
      message: msg,
      duration: 3000,
      color: 'tertiary'
    });
    openToast.present();
  }
}
