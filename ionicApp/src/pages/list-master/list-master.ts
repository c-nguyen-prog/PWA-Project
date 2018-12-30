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
  constructor(public navCtrl: NavController, public http: HttpClient) {
    this.loadTransactions();
  }

  loadTransactions(){
    let data:Observable<any>;
    data = this.http.get('https://jsonplaceholder.typicode.com/posts');
    data.subscribe(result=>{
      this.transactions = result;
    })
  }

  transactionClick(transaction:number){
    alert(transaction);
  }
}
