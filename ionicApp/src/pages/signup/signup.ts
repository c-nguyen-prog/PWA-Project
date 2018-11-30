import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';
import { User } from '../../providers';

import {signup2} from "../";


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
    name: string,
   surName: string,
    email: string,
    password: string
  } = {
   name: 'Jeb ',
   surName: 'Bush',
    email: 'test@example.com',
    password: 'test'
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

      //this.navCtrl.push(MainPage);

      // Unable to sign up
      let toast = this.toastCtrl.create({
        message: this.signupErrorString,
        duration: 3000,
        position: 'top'
      });
      toast.present();
    });
  }


  forward() {
    let promise = this.navCtrl.push(signup2);
  }
}
