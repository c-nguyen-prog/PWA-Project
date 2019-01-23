import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController } from 'ionic-angular';

import { Item } from '../../models/item';
import { Items } from '../../providers';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@IonicPage()
@Component({
  selector: 'page-list-master',
  templateUrl: 'list-master.html'
})
export class ListMasterPage {
  public transactions:any;
  public transactionsArray:any;
  public filterTransactions:any;
  public user:string;
  public balance:number;

  constructor(public navCtrl: NavController, public http: HttpClient) {
    this.loadTransactions();
    this.user = localStorage.getItem("username");
  }


  loadTransactions(){
    let data:Observable<any>;
    data = this.http.post('http://localhost:8888/user/transactions', {username: localStorage.getItem("username")});
    data.subscribe(result=>{
      this.transactions = result;
      this.balance = this.transactions.balance;
      this.filterTransactions = this.transactions.transactions;
      this.transactionsArray = this.transactions.transactions;
    })
  }

  filter(param:any):void {
    let val: string = param;

    this.filterTransactions = this.transactionsArray;

    if (val.trim() !== '') {
      this.filterTransactions= this.filterTransactions.filter((item) => {
          return item.source.toLowerCase().indexOf(val.toLowerCase()) > -1 || item.destination.toLowerCase().indexOf(val.toLowerCase()) > -1 || item.reference.toLowerCase().indexOf(val.toLowerCase()) > -1;
        })
    }
  }

  filter2(param:any):void {
    let val: string = param;
    this.filterTransactions = this.transactionsArray;
    if (val.trim() !== 'all') {
      if (val.trim() == 'done' || val.trim() == 'pending') {
        this.filterTransactions = this.filterTransactions.filter((item) => {
          return item.status.toLowerCase().indexOf(val.toLowerCase()) > -1;
        })
      } else {
        this.filterTransactions = this.filterTransactions.filter((item) => {
          return item.type.toLowerCase().indexOf(val.toLowerCase()) > -1;
        })
      }
    }
  }
}
