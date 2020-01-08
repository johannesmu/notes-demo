import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
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
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.signInForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })
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
        console.log(error)
      })
  }

  async signUp() {
    const signUpModal = await this.modal.create({
      component: SignupPage
    });
    signUpModal.onDidDismiss().then((response) => {
      if (response.data) {
        //handle signup response
        const email = response.data.email;
        const password = response.data.password;
        this.auth.signUp(email, password)
          .then((userData) => {
            // sign up successful
            this.router.navigate(['/notes']);
          })
          .catch((error) => {
            // handle errors
          })
      }
    })
    await signUpModal.present();
  }

}
