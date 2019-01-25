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
  public serverResponse:any;
  public transactionsArray:any;
  public filterTransactions:any;
  public user:string;
  public balance:number;
  public filterSearch: string;
  public filterOption: string;

  constructor(public navCtrl: NavController, public http: HttpClient) {
    this.user = localStorage.getItem("username");
    this.loadTransactions();
    this.filterOption = 'all';
    this.filterSearch = '';
  }


  loadTransactions(){
    let data:Observable<any>;
    data = this.http.post('http://localhost:8888/user/transactions', {username: this.user});
    data.subscribe(result=>{
      this.serverResponse = result;
      this.balance = this.serverResponse.balance;
      this.filterTransactions = this.serverResponse.transactions.reverse();
      this.transactionsArray = this.serverResponse.transactions.reverse();
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
}
