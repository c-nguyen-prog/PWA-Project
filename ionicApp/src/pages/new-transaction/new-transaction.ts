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
    source: localStorage.getItem("username"),
    destination: '00425680345 ',
    reference: 'salary',
    date: new Date().toDateString(),
    amount: 420,
    recipient: 'Jeb Bush',
     type: "now"

};

  type: string;
  private execLater: boolean = false;
  public saveAsTemplate: boolean = false;


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
      source: [localStorage.getItem("username")],
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
    console.log("reference is " + referencerino);
    console.log("Finished loading template, please continue");
   // this.transactionForm.patchValue({recipient: selectObj.recipient, destination:
     // selectObj.destination, amount: selectObj.amount, reference: selectObj.reference});
    this.transactionForm.controls['recipient'].setValue(recipienterino);
    this.transactionForm.controls['destination'].setValue(destinationerino);
    this.transactionForm.controls['amount'].setValue(amounterino);
    this.transactionForm.controls['reference'].setValue(referencerino);
    this._cdr.detectChanges();

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
      let referencerino: string;
      let amounterino: number;
      let destinationerino: string;
      let recipienterino: string;
      referencerino = this.transactionForm.value['reference'];
      console.log("The value of this thing to test called referencerino is:" + referencerino);
      console.log("The value of the form is: ")
      console.log(this.transactionForm.value);
     // let tempTransfer = JSON.parse(JSON.stringify(this.transaction));
      console.log("Save? " + this.getSaveAsTemplate());
      if(this.getSaveAsTemplate()==true) {
        console.log("The value of the form  AFTER TICKING SAVE is: ")
        console.log(this.transactionForm.value);
        console.log("What is going to be saved is: ");
        console.log("Destination: " + this.transactionForm.get('destination'));
        console.log("Recipient: " + this.transactionForm.controls['destination']);
        console.log("Amount: " + this.transactionForm.controls['destination']);
        console.log("Destination: " + this.transactionForm.controls['destination']);
        this.templateServicerino.createTemplate(this.transactionForm.value['destination'], this.transactionForm.value['recipient'], this.transactionForm.value['amount'], this.transactionForm.value['reference'] );
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
