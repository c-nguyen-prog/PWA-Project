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
  private serverErrorString: string;

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
  }

  // Attempt to login in through our User service
  doLogin() {
    this.user.login(JSON.stringify(this.account)).subscribe((resp : any) => {
      console.log(resp);
      if (resp.status === "success") {
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
        console.log("ERROR: Wrong login info login.ts");
        let toast = this.toastCtrl.create({
        message: this.loginErrorString,
        duration: 3000,
        position: 'top'
      });
      toast.present();
      }
    }, (err) => {
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
}
