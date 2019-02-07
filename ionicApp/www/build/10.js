webpackJsonp([10],{

/***/ 339:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NewTransactionPageModule", function() { return NewTransactionPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(118);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__new_transaction__ = __webpack_require__(359);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__ = __webpack_require__(119);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var NewTransactionPageModule = /** @class */ (function () {
    function NewTransactionPageModule() {
    }
    NewTransactionPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__new_transaction__["a" /* NewTransactionPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__new_transaction__["a" /* NewTransactionPage */]),
                __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__["b" /* TranslateModule */].forChild()
            ],
        })
    ], NewTransactionPageModule);
    return NewTransactionPageModule;
}());

//# sourceMappingURL=new-transaction.module.js.map

/***/ }),

/***/ 359:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NewTransactionPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers__ = __webpack_require__(120);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(118);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_services_template_service__ = __webpack_require__(227);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






/**
 * Generated class for the NewTransactionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var NewTransactionPage = /** @class */ (function () {
    function NewTransactionPage(formBuilder, _cdr, toastCtrl, navCtrl, navParams, userService, transferServicerino, templateServicerino) {
        this.formBuilder = formBuilder;
        this._cdr = _cdr;
        this.toastCtrl = toastCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.userService = userService;
        this.transferServicerino = transferServicerino;
        this.templateServicerino = templateServicerino;
        this.disabledButton = false;
        this.applicationServerPublicKey = 'BDFc2s7Haf2s9lt9ttYZGvwV366dP78zP-xps4Z3sKx9k_u3Wbb56vzC4FXMZJPyGZx_X7ke6rtKk1dCWok68N4';
        //readonly pushButton = document.querySelector('.js-push-btn');
        this.isSubscribed = false;
        this.swRegistration = null;
        this.submitAttempt = false;
        this.transaction = {
            source: "Jeb",
            //source: localStorage.getItem("username").toString(),
            destination: '00425680345 ',
            reference: 'salary',
            date: new Date().toDateString(),
            amount: 420,
            recipient: 'Jeb Bush',
            type: "now"
        };
        this.execLater = false;
        this.saveAsTemplate = false;
        var myWorker = new Worker('/src/app/sw.js');
        myWorker.onmessage = function (event) {
            //what happens onmessage receiving goes here
        };
        myWorker.postMessage('worker running');
        if ('serviceWorker' in navigator && 'PushManager' in window) {
            console.log('Service Worker and Push is supported');
            navigator.serviceWorker.register('sw.js')
                .then(function (swReg) {
                console.log('Service Worker is registered', swReg);
                this.swRegistration = swReg;
                this.initializeUI();
            })
                .catch(function (error) {
                console.error('Service Worker Error', error);
            });
        }
        else {
            console.warn('Push messaging is not supported');
            this.pushButton.textContent = 'Push Not Supported';
        }
        this.setExecLater(false);
        this.transaction.type = "now";
        this.templateServicerino.createTemplate("DE365849", "John Johnson", 420, "Testerino");
        this.templates = this.templateServicerino.getAllTemplates();
        console.log(this.templates);
        console.log(this.selectObj);
        console.log("finished loading stuff");
        this.transactionForm = formBuilder.group({
            source: [sessionStorage.getItem("username")],
            recipient: ['', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].maxLength(30), __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].pattern('[a-zA-Z ]*'), __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].required])],
            destination: ['', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].maxLength(30), __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].pattern('[a-zA-Z0-9 ]*'), __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].required])],
            amount: [0.01, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].maxLength(30), __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].pattern('^(\\d*\\.)?\\d+$'), __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].required])],
            type: ['now'],
            reference: ['', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].maxLength(30), __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].pattern('[a-zA-Z0-9 ]*'), __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].required])],
            date: [new Date().toISOString().split('T')[0]]
        });
    }
    NewTransactionPage.prototype.setSaveAsTemplate = function (value) {
        this.saveAsTemplate = value;
    };
    NewTransactionPage.prototype.getSaveAsTemplate = function () {
        return this.saveAsTemplate;
    };
    NewTransactionPage.prototype.setExecLater = function (value) {
        if (value == true) {
            var day = new Date();
            console.log(day);
            var nextDay = new Date(day);
            nextDay.setDate(day.getDate() + 1);
            console.log(nextDay);
            this.transaction.date = nextDay.toDateString();
        }
        this.execLater = value;
    };
    NewTransactionPage.prototype.getExecLater = function () {
        return this.execLater;
    };
    NewTransactionPage.prototype.onSelectChange = function (selected, selectObj) {
        var referencerino;
        var amounterino;
        var destinationerino;
        var recipienterino;
        console.log(selected, selectObj);
        console.log("selectObj is " + selectObj.toString());
        console.log("recipient is " + selectObj.recipient);
        console.log("destination is " + selectObj.destination);
        console.log("amount is " + selectObj.amount);
        console.log("reference is " + selectObj.reference);
        this.templates.forEach(function (value) {
            console.log("the template we have is");
            console.log(value);
            if (selectObj.toString().indexOf(value.reference) > -1) {
                console.log("found match");
                referencerino = value.reference;
                amounterino = value.amount;
                recipienterino = value.recipient;
                destinationerino = value.destination;
            }
        });
        console.log("selectObj is " + selectObj.toString());
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
    };
    NewTransactionPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad NewTransactionPage');
    };
    NewTransactionPage.prototype.cancel = function () {
        this.transactionForm = this.formBuilder.group({
            recipient: ['', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].maxLength(30), __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].pattern('[a-zA-Z ]*'), __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].required])],
            destination: ['', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].maxLength(30), __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].pattern('[a-zA-Z0-9 ]*'), __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].required])],
            amount: ['0', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].maxLength(30), __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].pattern('^(\\d*\\.)?\\d+$'), __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].required])],
            type: ['now'],
            reference: ['', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].maxLength(30), __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].pattern('[a-zA-Z0-9 ]*'), __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].required])],
            date: [new Date().toUTCString()]
        });
    };
    NewTransactionPage.prototype.doTransaction = function () {
        var _this = this;
        this.transactionForm.value['amount'] = parseFloat(this.transactionForm.value['amount']);
        var referencerino;
        // let amounterino: number;
        //let destinationerino: string;
        //let recipienterino: string;
        referencerino = this.transactionForm.value['reference'];
        console.log("The value of this thing to test called referencerino is:" + referencerino);
        console.log("The value of the form is: ");
        console.log(this.transactionForm.value);
        // let tempTransfer = JSON.parse(JSON.stringify(this.transaction));
        console.log("Save? " + this.getSaveAsTemplate());
        if (this.getSaveAsTemplate() == true) {
            console.log("The value of the form  AFTER TICKING SAVE is: ");
            console.log(this.transactionForm.value);
            console.log("What is going to be saved is: ");
            console.log("Destination: " + this.transactionForm.get('destination'));
            console.log("Recipient: " + this.transactionForm.controls['destination']);
            console.log("Amount: " + this.transactionForm.controls['destination']);
            console.log("Destination: " + this.transactionForm.controls['destination']);
            this.templateServicerino.createTemplate(this.transactionForm.value['destination'], this.transactionForm.value['recipient'], this.transactionForm.value['amount'], this.transactionForm.value['reference']);
        }
        this.transferServicerino.transfer(JSON.stringify(this.transactionForm.value)).subscribe(function (resp) {
            console.log(resp);
            if (resp.status === "success") {
                console.log("Successfully transfered");
                var toastsucc = _this.toastCtrl.create({
                    message: "Transaction successfully generated. ",
                    duration: 3000,
                    position: 'top'
                });
                toastsucc.present();
            }
            else {
                console.log("failed");
            }
        }, function (err) {
            // Unable to sign up
            var toast = _this.toastCtrl.create({
                message: "Error when attempting to transfer",
                duration: 3000,
                position: 'top'
            });
            toast.present();
        });
    };
    NewTransactionPage.prototype.urlB64ToUint8Array = function (base64String) {
        var padding = '='.repeat((4 - base64String.length % 4) % 4);
        var base64 = (base64String + padding)
            .replace(/\-/g, '+')
            .replace(/_/g, '/');
        var rawData = window.atob(base64);
        var outputArray = new Uint8Array(rawData.length);
        for (var i = 0; i < rawData.length; ++i) {
            outputArray[i] = rawData.charCodeAt(i);
        }
        return outputArray;
    };
    NewTransactionPage.prototype.updateBtn = function () {
        if (Notification.permission === 'denied') {
            this.pushButton.textContent = 'Push Messaging Blocked.';
            this.disabledButton = true;
            this.updateSubscriptionOnServer(null);
            return;
        }
        if (this.isSubscribed) {
            this.pushButton.textContent = 'Disable Push Messaging';
        }
        else {
            this.pushButton.textContent = 'Enable Push Messaging';
        }
        this.disabledButton = false;
    };
    NewTransactionPage.prototype.initializeUI = function () {
        this.pushButton.addEventListener('click', function () {
            this.pushButton.disabled = true;
            if (this.isSubscribed) {
                //  Unsubscribe user
                this.unsubscribeUser();
            }
            else {
                this.subscribeUser();
            }
        });
        // Set the initial subscription value
        this.swRegistration.pushManager.getSubscription()
            .then(function (subscription) {
            this.isSubscribed = !(subscription === null);
            this.updateSubscriptionOnServer(subscription);
            if (this.isSubscribed) {
                console.log('User IS subscribed.');
            }
            else {
                console.log('User is NOT subscribed.');
            }
            this.updateBtn();
        });
    };
    NewTransactionPage.prototype.subscribeUser = function () {
        var applicationServerKey = this.urlB64ToUint8Array(this.applicationServerPublicKey);
        this.swRegistration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: applicationServerKey
        })
            .then(function (subscription) {
            console.log('User is subscribed.');
            this.updateSubscriptionOnServer(subscription);
            this.isSubscribed = true;
            this.updateBtn();
        })
            .catch(function (err) {
            console.log('Failed to subscribe the user: ', err);
            this.updateBtn();
        });
    };
    NewTransactionPage.prototype.updateSubscriptionOnServer = function (subscription) {
        // Send subscription to application server
        var subscriptionJson = document.querySelector('.js-subscription-json');
        var subscriptionDetails = document.querySelector('.js-subscription-details');
        if (subscription) {
            subscriptionJson.textContent = JSON.stringify(subscription);
            subscriptionDetails.classList.remove('is-invisible');
        }
        else {
            subscriptionDetails.classList.add('is-invisible');
        }
    };
    NewTransactionPage.prototype.unsubscribeUser = function () {
        this.swRegistration.pushManager.getSubscription()
            .then(function (subscription) {
            if (subscription) {
                return subscription.unsubscribe();
            }
        })
            .catch(function (error) {
            console.log('Error unsubscribing', error);
        })
            .then(function () {
            this.updateSubscriptionOnServer(null);
            console.log('User is unsubscribed.');
            this.isSubscribed = false;
            this.updateBtn();
        });
    };
    NewTransactionPage.prototype.logout = function () {
        sessionStorage.removeItem("username");
        this.navCtrl.push('WelcomePage');
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('pushButton'),
        __metadata("design:type", Object)
    ], NewTransactionPage.prototype, "pushButton", void 0);
    NewTransactionPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-new-transaction',template:/*ion-inline-start:"C:\Coding\Uni\PWA Projekt\progappjs\ionicApp\src\pages\new-transaction\new-transaction.html"*/'\n<ion-header>\n\n  <ion-navbar>\n     <button ion-button icon-only menuToggle color="white">\n      <ion-icon name="menu" class="custom-icon"></ion-icon>\n    </button>\n    <ion-title>New transaction</ion-title>\n    <ion-buttons right class="hide-small">\n      <ion-col col-6>\n        <button ion-button (click)="logout()" class="glyphicon-log-out" round>Log out</button>\n      </ion-col>\n      <ion-col col-6>\n      </ion-col>\n    </ion-buttons>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  <div class="transaction-form">\n    <form [formGroup]="transactionForm" (submit)="doTransaction()">\n           <ion-list class="listerino">\n        <ion-item>\n          <ion-label fixed>{{ \'Recipient\' | translate }}</ion-label>\n          <ion-input  [class.invalid]="!transactionForm.controls[\'recipient\'].valid && (transactionForm.controls[\'recipient\'].dirty || submitAttempt)" [formControl]="transactionForm.controls[\'recipient\']" type="text"  ></ion-input>\n          <p>Please enter a valid name.</p>\n        </ion-item>\n             <ion-item>\n          <ion-label fixed>{{ \'IBAN\' | translate }}</ion-label>\n          <ion-input  [class.invalid]="!transactionForm.controls[\'destination\'].valid && (transactionForm.controls[\'destination\'].dirty || submitAttempt)" [formControl]="transactionForm.controls[\'destination\']" type="text" ></ion-input>\n               <p>Please enter a valid IBAN.</p>\n        </ion-item>\n        <ion-item>\n          <ion-label fixed>{{ \'Amount\' | translate }}</ion-label>\n          <ion-input [class.invalid]="!transactionForm.controls[\'amount\'].valid && (transactionForm.controls[\'amount\'].dirty || submitAttempt)" [formControl]="transactionForm.controls[\'amount\']"  type="number"  min="0.01" class="quantity" required ></ion-input>\n          <p>Please enter a valid amount.</p>\n        </ion-item>\n        <ion-item>\n          <ion-label >Execution mode</ion-label>\n          <ion-select formControlName="type" >\n            <ion-option value="now" (ionSelect)="setExecLater(false)">As soon as possible</ion-option>\n            <ion-option value="date"  (ionSelect)="setExecLater(true)">Future date</ion-option>\n            <ion-option value="standing"  (ionSelect)="setExecLater(true)">Standing order</ion-option>\n          </ion-select>\n        </ion-item>\n        <ion-item>\n          <ion-label>{{ \'Execution date\' | translate }}</ion-label>\n          <ion-datetime formControlName="date" [disabled]="!getExecLater()" displayFormat="YYYY-MM-DD">\n          </ion-datetime>\n        </ion-item>\n        <ion-item>\n          <ion-label fixed>{{ \'Description\' | translate }}</ion-label>\n          <ion-input [formControl]="transactionForm.controls[\'reference\']" type="text" ></ion-input>\n        </ion-item>\n           </ion-list>\n    </form>\n             <ion-item>\n               <ion-checkbox  [checked]="saveAsTemplate" [(ngModel)]="saveAsTemplate" ></ion-checkbox>\n               <ion-label  fixed>{{\'Save\' | translate }}</ion-label>\n             </ion-item>\n\n             <ion-item>\n               <ion-label class="loader">Load template</ion-label>\n               <ion-select [(ngModel)]="selectObj" (ionChange)="onSelectChange($event, selectObj)">\n                 <ion-option *ngFor = "let template of templates;">\n                   {{template.reference}}\n                 </ion-option>\n               </ion-select>\n             </ion-item>\n\n        <div class="buttons" padding align="center">\n          <button class="buttonerino" (click)="doTransaction()" ion-button color="primary" block>{{ \'Accept\' | translate }}</button>\n          <button type="button" (click)="cancel()" class="buttonerino"  ion-button color="primary" block>{{ \'Reset\' | translate }}</button>\n       </div>\n  <button #pushButton ion-button  (click)="updateBtn()" [disabled]="disabledButton" color="primary" block>{{ \'Enable notifications\' | translate }}</button>\n\n    <script src="scripts/main.js"></script>\n\n  </div>\n</ion-content>\n'/*ion-inline-end:"C:\Coding\Uni\PWA Projekt\progappjs\ionicApp\src\pages\new-transaction\new-transaction.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__angular_forms__["a" /* FormBuilder */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["j" /* ChangeDetectorRef */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["k" /* ToastController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1__providers__["e" /* User */], __WEBPACK_IMPORTED_MODULE_1__providers__["d" /* TransferService */], __WEBPACK_IMPORTED_MODULE_4__app_services_template_service__["a" /* TemplateService */]])
    ], NewTransactionPage);
    return NewTransactionPage;
}());

//# sourceMappingURL=new-transaction.js.map

/***/ })

});
//# sourceMappingURL=10.js.map