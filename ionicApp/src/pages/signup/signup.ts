import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';
import { User } from '../../providers';
import { MainPage } from '../';


import Hashes from "jshashes";

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {
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
    title: 'Mr.',
    name: 'Jeb ',
    surName: 'Bush',
    birthdate: '1953-11-02',
    email: 'test@example.com',
    password: 'test',
    phone: '323990001337',
    address: 'Monroe street 400',
    zipcode: '32399',
    city: 'Tallahassee',
    tin:  '2258383',
    nationality: 'American'
  };

  // Our translated text strings
  private signupErrorString: string;

  constructor(public navCtrl: NavController,
              public user: User,
              public toastCtrl: ToastController,
              public translateService: TranslateService) {

    this.translateService.get('SIGNUP_ERROR').subscribe((value) => {
      this.signupErrorString = value;
    })
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
}
