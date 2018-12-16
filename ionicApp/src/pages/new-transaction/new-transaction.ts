import { Component } from '@angular/core';
import { User } from '../../providers';
import { TransferService } from '../../providers';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {Transaction} from "../../app/interfaces/iTransaction";
import {setExistingDeepLinkConfig} from "@ionic/app-scripts/dist/deep-linking";

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
 public transaction: Transaction =
   {
    source: this.userService._user,
    iban: '00425680345 ',
    description: 'salary',
    bookingDate: new Date().toISOString(),
    amount: 420,
    recipient: 'Jeb Bush',

};

  execMode: string;
  private execLater: boolean = false;

  public setExecLater(value: boolean) {
    this.execLater = value;
  }

  public getExecLater(): boolean{
    return this.execLater;
  }
  constructor(    public toastCtrl: ToastController, public navCtrl: NavController, public navParams: NavParams, public userService: User, public transferServicerino: TransferService) {
    this.setExecLater(false);
    this.execMode = "now";
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewTransactionPage');

  }
  cancel() {
   // this.navCtrl.push('NewTransactionPage')
  }

    doTransaction() {

      let tempTransfer = JSON.parse(JSON.stringify(this.transaction));
      this.transferServicerino.transfer(JSON.stringify(this.transaction)).subscribe((resp : any) => {
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
