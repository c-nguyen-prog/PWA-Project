import {Component, ViewChild} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {IonicPage, Nav, NavController, ToastController} from 'ionic-angular';
import { User } from '../../providers';
import { MainPage } from '../';

import Hashes from "jshashes";

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  account: {
    email: string,
    password: string
  } =
    {
    email: "",
    password: ""
  };

  // Our translated text strings
  private loginErrorString: string;
  private serverErrorString: string;
  private accountErrorString: string;

  constructor(public navCtrl: NavController,
    public user: User,
    public toastCtrl: ToastController,
    public translateService: TranslateService) {

    this.translateService.get('LOGIN_ERROR').subscribe((value) => {
      this.loginErrorString = value;
    });
    this.translateService.get('SERVER_ERROR').subscribe((value) => {
      this.serverErrorString = value;
    });
    this.translateService.get('ACCOUNT_ERROR').subscribe((value) => {
      this.accountErrorString = value;
    });
  }

  // Attempt to login in through our User service
  doLogin() {
    let tempAccount = JSON.parse(JSON.stringify(this.account));
    tempAccount.password = new Hashes.SHA512().hex(tempAccount.password);
    this.user.login(JSON.stringify(tempAccount)).subscribe((resp : any) => {
      console.log(resp);
      if (resp.status === "success") {

        sessionStorage.setItem("username", this.account.email);
        this.navCtrl.push(MainPage);
        console.log("Successfully logged in");
        let toast = this.toastCtrl.create({
          message: "Hallo " + resp.user.name,
          duration: 3000,
          position: 'top'
        });
      toast.present();
      } else {
      // Unable to log in
        if (resp.reason === "no-match") {
          console.log("ERROR: Username and password aren't matched");
          let toast = this.toastCtrl.create({
            message: this.loginErrorString,
            duration: 3000,
            position: 'top'
          });
          toast.present();

        } else if (resp.reason === "inactive") {
          console.log("ERROR: Account isn't active");
          let toast = this.toastCtrl.create({
            message: this.accountErrorString,
            duration: 3000,
            position: 'top'
          });
          toast.present();
        }  else if (resp.user.name === "N/A") {
          console.log("ERROR: Account isn't active");
          let toast = this.toastCtrl.create({
            message: this.loginErrorString,
            duration: 3000,
            position: 'top'
          });
          toast.present();
        }
      }
    }, (err) => {
      //this.navCtrl.push(MainPage);  THIS LINE IS ONLY FOR TESTING PURPOSES
      // Unable to log in
      console.log("ERROR login.ts");
      let toast = this.toastCtrl.create({
        message: this.serverErrorString,
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
