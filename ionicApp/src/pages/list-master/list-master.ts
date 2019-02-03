import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

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
      this.balance = +sessionStorage.getItem("balance");
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
        return item.source_user.toLowerCase().indexOf(this.filterSearch) > -1 || item.destination_user.toLowerCase().indexOf(this.filterSearch) > -1 || item.reference.toLowerCase().indexOf(this.filterSearch) > -1;
      })
    }
  }

  slice(){
    this.arraySize -=10;
    this.filter();
  }

  expand(){
    this.arraySize +=10;
    this.filter();
  }

  checkSizeBig(){
    return Boolean(this.arraySize < (this.filterTransactions.length));
  }

  checkSizeSmall(){
    return Boolean (10 < (this.filterTransactions.length));
  }
}
