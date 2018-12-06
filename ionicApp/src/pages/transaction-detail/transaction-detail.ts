import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import {Transaction} from "../../app/interfaces/iTransaction";


@IonicPage()
@Component({
  selector: 'page-transaction',
  templateUrl: 'transaction-detail.html',
})
export class TransactionPage {
  public transactionId: string;
  public accountId: string;
  public transaction: Transaction;

  constructor(public navCtrl: NavController,
              public viewCtrl: ViewController,
              public navParams: NavParams) {

  }

  public ionViewDidLoad() {
    console.log('ionViewDidLoad TransactionPage');
        this.transactionId = this.navParams.get('transactionId');
    this.accountId = this.navParams.get('accountId');

    console.log(this.accountId);
   //fetchtransaction doesn't exist yet this.fetchTransaction(this.accountId, this.bic, this.transactionId).subscribe(transaction => {
//      this.transaction = transaction;

   //   console.log(JSON.stringify(transaction));
   // });
 // }
  // private close() {
  //   this.viewCtrl.dismiss();
   }
}
