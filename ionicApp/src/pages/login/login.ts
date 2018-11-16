import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';
import  Hashes  from 'jshashes';
import { User } from '../../providers';
import { MainPage } from '../';

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
    email: "admin",
    password: "admin"
      //new Hashes.SHA256().hex('test')
  };

  // Our translated text strings
  private loginErrorString: string;

  constructor(public navCtrl: NavController,
    public user: User,
    public toastCtrl: ToastController,
    public translateService: TranslateService) {

    this.translateService.get('LOGIN_ERROR').subscribe((value) => {
      this.loginErrorString = value;
    })
  }

  // Attempt to login in through our User service
  doLogin() {
    var result;
    this.user.login(JSON.stringify(this.account)).subscribe((resp : any) => {
      console.log(resp);
      if (resp.status === "success") {
          this.navCtrl.push(MainPage);
      } else {
        this.navCtrl.push(LoginPage);
      // Unable to log in
      console.log("wrong pass login.ts");
      let toast = this.toastCtrl.create({
        message: this.loginErrorString,
        duration: 1000,
        position: 'top'
      });
      toast.present();
      }
    }, (err) => {
      this.navCtrl.push(LoginPage);
      // Unable to log in
      console.log("error login.ts");
      let toast = this.toastCtrl.create({
        message: this.loginErrorString,
        duration: 1000,
        position: 'top'
      });
      toast.present();
    });
  }
}
