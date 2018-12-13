import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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
  execMode: string;
  private execLater: boolean = false;

  public setExecLater(value: boolean) {
    this.execLater = value;
  }

  public getExecLater(): boolean{
    return this.execLater;
  }

    public transaction: Transaction;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.setExecLater(false);
    this.execMode = "now";
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewTransactionPage');

  }

}
