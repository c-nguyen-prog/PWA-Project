import { Component } from '@angular/core';
import { User } from '../../providers';
import { TransferService } from '../../providers';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {Transaction} from "../../app/interfaces/iTransaction";
import {setExistingDeepLinkConfig} from "@ionic/app-scripts/dist/deep-linking";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AgeValidator} from "../../validators/age";

/**
 * Generated class for the NewTransactionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-new-transaction',
  templateUrl: 'new-transaction.html',
})
export class NewTransactionPage {
  submitAttempt: boolean = false;
  transactionForm: FormGroup;
 public transaction: Transaction =
   {
    source: this.userService._user,
    destination: '00425680345 ',
    reference: 'salary',
    date: new Date().toDateString(),
    amount: 420,
    recipient: 'Jeb Bush',
     type: "now"

};

  execMode: string;
  private execLater: boolean = false;

  public setExecLater(value: boolean) {
    if (value==true) {
      var day = new Date();
      console.log(day);

      var nextDay = new Date(day);
      nextDay.setDate(day.getDate()+1);
      console.log(nextDay);
      this.transaction.date = nextDay.toDateString();
    }
    this.execLater = value;
  }

  public getExecLater(): boolean{

    return this.execLater;
  }
  constructor( public formBuilder: FormBuilder,   public toastCtrl: ToastController, public navCtrl: NavController, public navParams: NavParams, public userService: User, public transferServicerino: TransferService) {
    this.setExecLater(false);
    this.transaction.type = "now";

    this.transactionForm = formBuilder.group({
      recipient: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      iban: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z0-9 ]*'), Validators.required])],
      amount: [0.01, Validators.compose([Validators.maxLength(30), Validators.pattern('^(\\d*\\.)?\\d+$'), Validators.required])],
      execMode: ['now'],
      description:  ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z0-9 ]*'), Validators.required])],
      bookingDate: [new Date().toISOString()]

    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewTransactionPage');

  }
  cancel() {
    this.transactionForm = this.formBuilder.group({
      recipient: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      iban: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z0-9 ]*'), Validators.required])],
      amount: ['0', Validators.compose([Validators.maxLength(30), Validators.pattern('^(\\d*\\.)?\\d+$'), Validators.required])],
      execMode: ['now'],
      description:  ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z0-9 ]*'), Validators.required])],
      bookingDate: [new Date().toUTCString()]

    });
  }

    doTransaction() {
      console.log(this.transactionForm.value);
      //let tempTransfer = JSON.parse(JSON.stringify(this.transaction));
      this.transferServicerino.transfer(JSON.stringify(this.transactionForm.value)).subscribe((resp : any) => {
      console.log(resp);
      if (resp.status === "success") {
        console.log("Successfully transfered");

        let toastsucc = this.toastCtrl.create({
          message: "Transaction successfully generated. ",
          duration: 3000,
          position: 'top'
        });
        toastsucc.present();
      } else {
        console.log("failed")
      }
    }, (err) => {

      // Unable to sign up
      let toast = this.toastCtrl.create({
        message: "Error when attempting to transfer",
        duration: 3000,
        position: 'top'
      });
      toast.present();
    });
  }




}
