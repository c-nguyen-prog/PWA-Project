import {Component, ViewChild} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../providers';
import { signup1 } from '../';
import {signup2} from "../";
import { AgeValidator } from  '../../validators/age';
import { EmailValidator } from  '../../validators/email';

import Hashes from "jshashes";

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup2.html'
})
export class SignupPage2 {
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  @ViewChild('signupSlider') signupSlider: any;
  slideOneForm: FormGroup;
  slideTwoForm: FormGroup;

  submitAttempt: boolean = false;
  constructor(public navCtrl: NavController, public formBuilder: FormBuilder) {

    this.slideOneForm = formBuilder.group({
      firstName: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      lastName: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      age: ['', AgeValidator.isValid]
    });

    this.slideTwoForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z]*')]), EmailValidator.checkEmail],
      privacy: ['', Validators.required],
      bio: ['']
    });

  }






  next(){
    this.signupSlider.slideNext();
  }

  prev(){
    this.signupSlider.slidePrev();
  }

  save(){

    this.submitAttempt = true;

    if(!this.slideOneForm.valid){
      this.signupSlider.slideTo(0);
    }
    else if(!this.slideTwoForm.valid){
      this.signupSlider.slideTo(1);
    }
    else {
      console.log("success!")
      console.log(this.slideOneForm.value);
      console.log(this.slideTwoForm.value);
    }

  }













  account: {
    title: string,
    address: string,
    streetNum: string,
    zipCode: string,
    city: string
  } = {
    title: 'Mr.',
    address: 'Vermont avenue',
    streetNum: '225',
    zipCode: '60385',
    city: "Sebring"
  };

  // Our translated text strings
  private signupErrorString: string;
/*
  constructor(public navCtrl: NavController,

              public toastCtrl: ToastController,
              public translateService: TranslateService) {

    this.translateService.get('SIGNUP_ERROR').subscribe((value) => {
      this.signupErrorString = value;
    })
  }
/*
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
*/
  forward() {
    let promise = this.navCtrl.push(signup2,
      {title: this.account.title,
        address: this.account.address,
        streetNum: this.account.streetNum,
        zipCode: this.account.zipCode,
        city: this.account.city
      }


    );
  }
}
