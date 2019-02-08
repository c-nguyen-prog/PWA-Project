import {Component, ViewChild} from '@angular/core';
import { IonicPage, ModalController, NavController } from 'ionic-angular';

import { Item } from '../../models/item';
import { Items } from '../../providers';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {json} from "ng2-validation/dist/json";

@IonicPage()
@Component({
  selector: 'page-list-master',
  templateUrl: 'list-master.html'
})
export class ListMasterPage {
  public serverResponse:any;
  public transactionsArray:any;
  public filterTransactions:any;
  public wholeArray:any;
  public user:string;
  public balance:number;
  public arraySize: number;
  public filterSearch: string;
  public filterOption: string;
  // @ViewChild('pushButton') pushButton;
 
  disabledButton: boolean;

  readonly applicationServerPublicKey = 'BDFc2s7Haf2s9lt9ttYZGvwV366dP78zP-xps4Z3sKx9k_u3Wbb56vzC4FXMZJPyGZx_X7ke6rtKk1dCWok68N4';
  // readonly pushButton = document.querySelector('.js-push-btn');

  isSubscribed = false;
  swRegistration = null;


  constructor(public navCtrl: NavController, public http: HttpClient) {


    this.user = sessionStorage.getItem("username");
    this.arraySize = 9;
    if(navigator.onLine) {
      this.loadTransactions();
    } else {
      let trans = sessionStorage.getItem('transactions');
      let transArr = JSON.parse(trans);
      this.wholeArray = transArr;
      this.filterTransactions = this.wholeArray.slice(0,this.arraySize);
      this.transactionsArray = this.filterTransactions;
      this.balance = sessionStorage.getItem("balance");
    }
    this.filterOption = 'all';
    this.filterSearch = '';
  }

  loadTransactions(){
    let data:Observable<any>;
    data = this.http.post('http://localhost:8888/user/transactions', {username: this.user});
    data.subscribe(result=>{
      this.serverResponse = result;
      this.balance = this.serverResponse.balance;
      this.wholeArray = this.serverResponse.transactions;
      this.filterTransactions = this.wholeArray.slice(0,this.arraySize);
      this.transactionsArray = this.filterTransactions;
      let json = JSON.stringify(this.serverResponse.transactions);
      sessionStorage.setItem("transactions", json);
      sessionStorage.setItem("balance", this.serverResponse.balance);
    });
  }

  filterSearchbar(param:any):void {
    this.filterSearch = param.toString().trim().toLowerCase();
    this.filter();
  }

  filterChooseOption(param:any):void {
    this.filterOption = param.toString().trim().toLowerCase();
    this.filter();
  }

  filter(){
    this.filterTransactions = this.transactionsArray;

    if (this.filterOption !== 'all') {
      if (this.filterOption == 'done' || this.filterOption == 'pending') {
        this.filterTransactions = this.filterTransactions.filter((item) => {
          return item.status.toLowerCase().indexOf(this.filterOption) > -1;
        })
      } else {
        this.filterTransactions = this.filterTransactions.filter((item) => {
          return item.type.toLowerCase().indexOf(this.filterOption) > -1;
        })
      }
    }

    if (this.filterSearch !== '') {
      this.filterTransactions= this.filterTransactions.filter((item) => {
        return item.source.toLowerCase().indexOf(this.filterSearch) > -1 || item.destination_username.toLowerCase().indexOf(this.filterSearch) > -1 || item.reference.toLowerCase().indexOf(this.filterSearch) > -1;
      })
    }
  }

  slice(){
    this.arraySize +=10;
    this.filter();
  }

  urlB64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/\-/g, '+')
      .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }











  subscribeUser() {
    const applicationServerKey = this.urlB64ToUint8Array(this.applicationServerPublicKey);
    this.swRegistration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: applicationServerKey
    })
      .then(function(subscription) {
        console.log('User is subscribed.');

        this.updateSubscriptionOnServer(subscription);

        this.isSubscribed = true;

        this.updateBtn();
      })
      .catch(function(err) {
        console.log('Failed to subscribe the user: ', err);
        this.updateBtn();
      });
  }


  updateSubscriptionOnServer(subscription) {
    // Send subscription to application server

    const subscriptionJson = document.querySelector('.js-subscription-json');
    const subscriptionDetails =
      document.querySelector('.js-subscription-details');

    if (subscription) {
      subscriptionJson.textContent = JSON.stringify(subscription);
      subscriptionDetails.classList.remove('is-invisible');
    } else {
      subscriptionDetails.classList.add('is-invisible');
    }
  }


  ionViewDidLoad(){

      const notification = new Notification('Notifications are enabled')

      if (notification.permission === 'denied') {

       // this.pushButton.textContent = 'Push Messaging Blocked.';
        this.disabledButton = true;
        this.updateSubscriptionOnServer(null);
        return;
      } else {
        this.disabledButton = true;
      } console.log("disabledbutton is "+this.disabledButton);
      console.log("Requesting Permission")

      Notification.requestPermission()
        .then((result) => {
          if(result === "denied"){
            //Denied
            return;
          }
          if(result === `default`){
            //Closed
            this.disabledButton = true;
            return;
          }

          //Yay granted
        });

      if (this.isSubscribed) {
       // this.pushButton.textContent = 'Disable Push Messaging';
      } else {
       // this.pushButton.textContent = 'Enable Push Messaging';
      }
      this.disabledButton = false;


  }

  unsubscribeUser() {
    this.swRegistration.pushManager.getSubscription()
      .then(function(subscription) {
        if (subscription) {
          return subscription.unsubscribe();
        }
      })
      .catch(function(error) {
        console.log('Error unsubscribing', error);
      })
      .then(function() {
        this.updateSubscriptionOnServer(null);

        console.log('User is unsubscribed.');
        this.isSubscribed = false;

        this.updateBtn();
      });
  }


}
