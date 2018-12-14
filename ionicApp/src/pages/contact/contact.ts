import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { User } from '../../providers';
import { MainPage } from '../';
import {TranslateService} from "@ngx-translate/core";

/**
 * Generated class for the ContactPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',
})
export class ContactPage {

  contactPage:{
    name:string,
    email:string,
    phoneNumber: number,
    message:string
  };

  private contactStringError

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public user:User,
              public toastCtrl:ToastController,
              public translateService:TranslateService) {

    this.translateService.get('SIGNUP_ERROR').subscribe((value) => {
      this.contactStringError = value;
    })

  }

  submitMessage() {
    let tempAccount = JSON.parse(JSON.stringify(this.contactPage));

    this.user.signup(JSON.stringify(tempAccount)).subscribe((resp : any) => {
      console.log(resp);
      if (resp.status === "success") {
        console.log("Thank you! We will contact you immediately!")
      } else {
        console.log("Something went wrong! Please try again!")
      }
    }, (err) => {

      let toast = this.toastCtrl.create({
        message: this.contactStringError,
        duration: 3000,
        position: 'top'
      });
      toast.present();
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactPage');
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
