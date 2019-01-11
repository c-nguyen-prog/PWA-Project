import {ChangeDetectorRef, Component} from '@angular/core';
import { User } from '../../providers';
import { TransferService } from '../../providers';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {Transaction} from "../../app/interfaces/iTransaction";
import {setExistingDeepLinkConfig} from "@ionic/app-scripts/dist/deep-linking";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AgeValidator} from "../../validators/age";
import {TemplateService} from "../../app/services/template.service";
import {Template} from "../../app/interfaces/template";
import {equals} from "@ngx-translate/core/src/util";

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
  submitAttempt: boolean = false;
  transactionForm: FormGroup;
  templates: Template[];
  selectObj: Template;
 public transaction: Transaction =
   {
    source: this.userService._user,
    destination: '00425680345 ',
    reference: 'salary',
    date: new Date().toDateString(),
    amount: 420,
    recipient: 'Jeb Bush',
     type: "now"

};

  type: string;
  private execLater: boolean = false;
  private saveAsTemplate: boolean = false;


  public setSaveAsTemplate(value: boolean) {
    this.saveAsTemplate = value;
  }

  public getSaveAsTemplate() {
    return this.saveAsTemplate;
  }

  public setExecLater(value: boolean) {
    if (value==true) {
      var day = new Date();
      console.log(day);

      var nextDay = new Date(day);
      nextDay.setDate(day.getDate()+1);
      console.log(nextDay);
      this.transaction.date = nextDay.toDateString();
    }
    this.execLater = value;
  }

  public getExecLater(): boolean{

    return this.execLater;
  }
  constructor( public formBuilder: FormBuilder, private _cdr: ChangeDetectorRef,   public toastCtrl: ToastController, public navCtrl: NavController, public navParams: NavParams, public userService: User, public transferServicerino: TransferService, public templateServicerino: TemplateService) {

    this.setExecLater(false);
    this.transaction.type = "now";
    this.templateServicerino.createTemplate("DE365849", "John Johnson", 420, "Testerino");
    this.templates = this.templateServicerino.getAllTemplates();
    console.log(this.templates);
    console.log(this.selectObj);
    console.log("finished loading stuff");
    this.transactionForm = formBuilder.group({
      source: [this.userService._user],
      recipient: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      destination: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z0-9 ]*'), Validators.required])],
      amount: [0.01, Validators.compose([Validators.maxLength(30), Validators.pattern('^(\\d*\\.)?\\d+$'), Validators.required])],
      type: ['now'],
      reference:  ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z0-9 ]*'), Validators.required])],
      date: [new Date().toISOString().split('T')[0]]

    });

  }
  onSelectChange(selected:any,selectObj){
   let referencerino: string;
   let amounterino: number;
   let destinationerino: string;
   let recipienterino: string;

    console.log(selected,selectObj);
    console.log( "selectObj is " + selectObj.toString());
    console.log("recipient is " + selectObj.recipient);
    console.log("destination is " + selectObj.destination);
    console.log("amount is " + selectObj.amount);
    console.log("reference is " + selectObj.reference);
    this.templates.forEach(function (value) {
      console.log("the template we have is")
      console.log(value);

      if( selectObj.toString().indexOf(value.reference)>-1) {
        console.log("found match")
        referencerino = value.reference;
        amounterino = value.amount;
        recipienterino = value.recipient;
        destinationerino = value.destination;
      }
    });

    console.log( "selectObj is " + selectObj.toString());
    console.log("recipient is " + recipienterino);
    console.log("destination is " + destinationerino);
    console.log("amount is " + amounterino);
    console.log("reference is " + amounterino);
    this.transactionForm.patchValue({recipient: selectObj.recipient, destination:
      selectObj.destination, amount: selectObj.amount, reference: selectObj.reference});
    this.transactionForm.controls['recipient'].setValue(recipienterino);
    this.transactionForm.controls['destination'].setValue(destinationerino);
    this.transactionForm.controls['amount'].setValue(amounterino);
    this.transactionForm.controls['reference'].setValue(referencerino);
    this._cdr.detectChanges();
/*
    this.transactionForm.updateValueAndValidity();

    this.transactionForm.reset();
    this.transactionForm = this.formBuilder.group( {
      source: [this.userService._user],
      recipient: [selectObj.recipient, Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      destination: [selectObj.destination, Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z0-9 ]*'), Validators.required])],
      amount: [selectObj.amount, Validators.compose([Validators.maxLength(30), Validators.pattern('^(\\d*\\.)?\\d+$'), Validators.required])],
      type: ['now'],
      reference:  [selectObj.reference, Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z0-9 ]*'), Validators.required])],
      date: [new Date().toISOString().split('T')[0]]
    })
    */

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewTransactionPage');

  }
  cancel() {
    this.transactionForm = this.formBuilder.group({
      recipient: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      destination: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z0-9 ]*'), Validators.required])],
      amount: ['0', Validators.compose([Validators.maxLength(30), Validators.pattern('^(\\d*\\.)?\\d+$'), Validators.required])],
      type: ['now'],
      reference:  ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z0-9 ]*'), Validators.required])],
      date: [new Date().toUTCString()]

    });
  }

    doTransaction() {
      console.log(this.transactionForm.value);
      //let tempTransfer = JSON.parse(JSON.stringify(this.transaction));

      if(this.getSaveAsTemplate()==true) {
        this.templateServicerino.createTemplate(this.transactionForm.controls['destination'], this.transactionForm.controls['recipient'], this.transactionForm.controls['amount'], this.transactionForm.controls['reference'] );
      }
      this.transferServicerino.transfer(JSON.stringify(this.transactionForm.value)).subscribe((resp : any) => {
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
