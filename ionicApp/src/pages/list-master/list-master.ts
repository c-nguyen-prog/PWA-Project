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
  public filterTransactions:any;
  public user:string;

  constructor(public navCtrl: NavController, public http: HttpClient) {
    this.loadTransactions();
    this.user = localStorage.getItem("username");
    this.filterTransactions = this.transactions;
  }


  loadTransactions(){
    let data:Observable<any>;
    data = this.http.post('http://localhost:8888/user/transactions', {username: localStorage.getItem("username")});
    data.subscribe(result=>{
      this.transactions = result;
    })
  }

  filter(param:any):void {
    this.loadTransactions();
    let val: string = param;

    if (val.trim() !== '') {
      this.filterTransactions= this.transactions.filter((item) => {
          return item.source.toLowerCase().indexOf(val.toLowerCase()) > -1 || item.destination.toLowerCase().indexOf(val.toLowerCase()) > -1 || item.reference.toLowerCase().indexOf(val.toLowerCase()) > -1;
        })
    } else {
      this.filterTransactions = this.transactions;
    }
  }

}
