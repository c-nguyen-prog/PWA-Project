import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Transaction} from "../../app/interfaces/iTransaction";
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
  public transaction: Transaction;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewTransactionPage');
  }

}
