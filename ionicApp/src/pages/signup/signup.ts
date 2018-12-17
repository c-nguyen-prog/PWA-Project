import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';
import { User } from '../../providers';
import { MainPage } from '../';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

import Hashes from "jshashes";
import {V} from "@angular/core/src/render3";

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage{
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  account: {
    title: string,
    name: string,
    surName: string,
    birthdate: string,
    email: string,
    password: string,
    phone: string,
    address: string,
    zipcode: string,
    city: string,
    tin: string,
    nationality: string

  } = {
    title: '',
    name: '',
    surName: '',
    birthdate: '',
    email: '',
    password: '',
    phone: '',
    address: '',
    zipcode: '',
    city: '',
    tin:  '',
    nationality: ''
  };

  // Our translated text strings
  private signupErrorString: string;
  submitForm: FormGroup;

  constructor(public navCtrl: NavController,
              public user: User,
              public toastCtrl: ToastController,
              public translateService: TranslateService,
              public formBuilder: FormBuilder) {

    this.translateService.get('SIGNUP_ERROR').subscribe((value) => {
      this.signupErrorString = value;
    });

    this.submitForm= formBuilder.group({
      title: ['', Validators.required],
      firstName: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z]*')])],
      lastName: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z]*')])],
      birthdate: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9._]+[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$')])], //https://forum.ionicframework.com/t/email-regex/102423/6
      password: ['', Validators.compose([Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$')])], //https://stackoverflow.com/questions/19605150/regex-for-password-must-contain-at-least-eight-characters-at-least-one-number-a
      passwordValidation: ['', Validators.compose([Validators.required])],
      phone: ['', Validators.compose([Validators.required, Validators.maxLength(11), Validators.pattern('[0-9]*')])],
      address: ['', Validators.required],
      zipcode: ['', Validators.compose([Validators.required, Validators.pattern('[0-9]{5}')])],
      city: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z]*')])],
      tin: ['', Validators.compose([Validators.required, Validators.pattern('[0-9]{11}')])],
      nationality: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z]*')])],
    }, {validator: SignupPage.match});
  }

  //https://forum.ionicframework.com/t/i-need-help-to-confirm-email-and-password/73668/2
  static match(cg: FormGroup): {[err: string]: any} {
    let pwd1 = cg.get('password');
    let pwd2 = cg.get('passwordValidation');
    let rv: {[error: string]: any} = {};
    if ((pwd1.touched || pwd2.touched) && pwd1.value !== pwd2.value) {
      rv['passwordMismatch'] = true;
    }
    return rv;
  }

  doSignup() {

    // Attempt to login in through our User service
    let tempAccount = JSON.parse(JSON.stringify(this.account));
    tempAccount.password = new Hashes.SHA512().hex(tempAccount.password);
    this.user.signup(JSON.stringify(tempAccount)).subscribe((resp : any) => {
      console.log(resp);
      if (resp.status === "success") {
        console.log("Successfully created account")
      } else {
        console.log("email already existed")
      }
    }, (err) => {

      // Unable to sign up
      let toast = this.toastCtrl.create({
        message: this.signupErrorString,
        duration: 3000,
        position: 'top'
      });
      toast.present();
    });
  }

  login() {
    this.navCtrl.push('LoginPage');
  }

  signup() {
    this.navCtrl.push('SignupPage');
  }

  contact(){
    this.navCtrl.push('ContactPage')
  }

  about(){
    this.navCtrl.push('AboutPage')
  }
}
