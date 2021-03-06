import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

import Typed from "typed.js";

/**
 * The Welcome Page is a splash page that quickly describes the app,
 * and then directs the user to create an account or log in.
 * If you'd like to immediately put the user onto a login/signup page,
 * we recommend not using the Welcome page.
*/

@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html'
})
export class WelcomePage {

  constructor(public navCtrl: NavController) {

  }

  ionViewDidLoad() {
     var typed3 = new Typed('#element', {
      strings: ['Wir sind  <b>digital</b>', 'Wir sind <b>die Bank</b>', "Willkommen bei <b>Digibank</b>"],
      typeSpeed: 40,
      backSpeed: 40,
      backDelay: 300,
      startDelay: 500,
      loop: false
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
  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.navCtrl.setRoot(page.component);
  }
}
