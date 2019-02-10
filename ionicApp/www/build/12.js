webpackJsonp([12],{

/***/ 336:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ListMasterPageModule", function() { return ListMasterPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__ = __webpack_require__(119);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(118);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__list_master__ = __webpack_require__(356);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var ListMasterPageModule = /** @class */ (function () {
    function ListMasterPageModule() {
    }
    ListMasterPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__list_master__["a" /* ListMasterPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_3__list_master__["a" /* ListMasterPage */]),
                __WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__["b" /* TranslateModule */].forChild()
            ],
            exports: [
                __WEBPACK_IMPORTED_MODULE_3__list_master__["a" /* ListMasterPage */]
            ]
        })
    ], ListMasterPageModule);
    return ListMasterPageModule;
}());

//# sourceMappingURL=list-master.module.js.map

/***/ }),

/***/ 356:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ListMasterPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(118);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__(121);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ListMasterPage = /** @class */ (function () {
    function ListMasterPage(navCtrl, http) {
        this.navCtrl = navCtrl;
        this.http = http;
        this.wholeArray = { length: 0 };
        this.user = sessionStorage.getItem("username");
        this.arraySize = 10;
        if (navigator.onLine) {
            this.loadTransactions();
        }
        else {
            var trans = sessionStorage.getItem('transactions');
            var transArr = JSON.parse(trans);
            this.wholeArray = transArr;
            this.filterTransactions = this.wholeArray.slice(0, this.arraySize);
            this.balance = +sessionStorage.getItem("balance");
        }
        this.filterOption = 'all';
        this.filterSearch = '';
    }
    ListMasterPage.prototype.loadTransactions = function () {
        var _this = this;
        var data;
        data = this.http.post('https://localhost:8888/user/transactions', { username: this.user });
        data.subscribe(function (result) {
            _this.serverResponse = result;
            _this.balance = _this.serverResponse.balance;
            _this.wholeArray = _this.serverResponse.transactions;
            _this.filterTransactions = _this.wholeArray.slice(0, _this.arraySize);
            var json = JSON.stringify(_this.serverResponse.transactions);
            sessionStorage.setItem("transactions", json);
            sessionStorage.setItem("balance", _this.serverResponse.balance);
        });
    };
    ListMasterPage.prototype.filterSearchbar = function (param) {
        this.filterSearch = param.toString().trim().toLowerCase();
        this.filter();
    };
    ListMasterPage.prototype.filterChooseOption = function (param) {
        this.filterOption = param.toString().trim().toLowerCase();
        this.filter();
    };
    ListMasterPage.prototype.filter = function () {
        var _this = this;
        this.filterTransactions = this.wholeArray.slice(0, this.arraySize);
        if (this.filterOption !== 'all') {
            if (this.filterOption == 'done' || this.filterOption == 'pending') {
                this.filterTransactions = this.filterTransactions.filter(function (item) {
                    return item.status.toLowerCase().indexOf(_this.filterOption) > -1;
                });
            }
            else {
                this.filterTransactions = this.filterTransactions.filter(function (item) {
                    return item.type.toLowerCase().indexOf(_this.filterOption) > -1;
                });
            }
        }
        if (this.filterSearch !== '') {
            this.filterTransactions = this.filterTransactions.filter(function (item) {
                return item.source_name.toLowerCase().indexOf(_this.filterSearch) > -1 || item.destination_name.toLowerCase().indexOf(_this.filterSearch) > -1 || item.reference.toLowerCase().indexOf(_this.filterSearch) > -1;
            });
        }
    };
    ListMasterPage.prototype.slice = function () {
        this.arraySize = this.arraySize - 10;
        this.filter();
    };
    ListMasterPage.prototype.expand = function () {
        this.arraySize = this.arraySize + 10;
        this.filter();
    };
    ListMasterPage.prototype.checkSizeBig = function () {
        return Boolean(this.arraySize > this.wholeArray.length);
    };
    ListMasterPage.prototype.checkSizeSmall = function () {
        return Boolean(10 >= this.arraySize);
    };
    ListMasterPage.prototype.logout = function () {
        sessionStorage.removeItem("username");
        this.navCtrl.push('WelcomePage');
    };
    var _a, _b;
    ListMasterPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-list-master',template:/*ion-inline-start:"C:\Coding\Uni\PWA Projekt\progappjs\ionicApp\src\pages\list-master\list-master.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <button ion-button icon-only menuToggle style="color: white">\n\n      <ion-icon name="menu" class="custom-icon"></ion-icon>\n\n    </button>\n\n    <ion-title>{{ \'BALANCE\' | translate }}{{balance}}€</ion-title>\n\n   <ion-buttons right class="hide-small">\n\n    <ion-col col-6>\n\n      <button ion-button (click)="logout()" class="signup" round>Log out</button>\n\n    </ion-col>\n\n    <ion-col col-6>\n\n    </ion-col>\n\n  </ion-buttons>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n\n\n<ion-content>\n\n  <div class = "transactionContent">\n\n\n\n     <ion-grid align-items-baseline>\n\n       <ion-row>\n\n         <ion-col>\n\n           <ion-searchbar (ionInput)="filterSearchbar($event.target.value)" class="searchbar"></ion-searchbar>\n\n         </ion-col>\n\n\n\n         <ion-col>\n\n           <ion-item>\n\n             <ion-label floating> {{\'LIST_MASTER_TRANS\' | translate}}</ion-label>\n\n             <ion-select (ionChange)="filterChooseOption($event)">\n\n               <ion-option value="all" [selected]="true">{{\'LIST_MASTER_ALL\' | translate}}</ion-option>\n\n               <ion-option value="pending">{{\'LIST_MASTER_PENDING\' | translate}}</ion-option>\n\n               <ion-option value="done">{{\'LIST_MASTER_DONE\' | translate}}</ion-option>\n\n               <ion-option value="date">{{\'LIST_MASTER_DATE\' | translate}}</ion-option>\n\n               <ion-option value="standing">{{\'LIST_MASTER_REPEAT\' | translate}}</ion-option>\n\n             </ion-select>\n\n           </ion-item>\n\n         </ion-col>\n\n       </ion-row>\n\n     </ion-grid>\n\n\n\n    <ion-list>\n\n      <ion-item *ngFor="let item of filterTransactions" class = "transactionEntry">\n\n        <ion-grid>\n\n          <ion-row>\n\n            <ion-col col-10>\n\n              <div *ngIf="(item.source === user)" class="destinationText">\n\n                {{\'LIST_MASTER_TO\' | translate}} {{item.destination_name}}\n\n              </div>\n\n              <div *ngIf="!(item.source === user)" class="destinationText">\n\n                {{\'LIST_MASTER_FROM\' | translate}} {{item.source_name}}\n\n              </div>\n\n            </ion-col>\n\n            <ion-col col-2>\n\n              <div *ngIf="(item.source === user)" class="outgoing" item-end>\n\n                -{{item.amount}}€\n\n              </div>\n\n              <div *ngIf="!(item.source === user)" class="incoming" item-end>\n\n                {{item.amount}}€\n\n              </div>\n\n            </ion-col>\n\n          </ion-row>\n\n        <ion-row>\n\n          <ion-col col-4 class="dateText">\n\n            {{item.date | date: "dd/MM/yy"}}\n\n          </ion-col>\n\n          <ion-col col-8 class="referenceText" text-wrap>\n\n            {{item.reference}}\n\n          </ion-col>\n\n        </ion-row>\n\n        </ion-grid>\n\n      </ion-item>\n\n    </ion-list>\n\n    <div class="loadMore-padding" padding>\n\n      <ion-grid>\n\n        <ion-row>\n\n          <ion-col col-6>\n\n            <button ion-button round (click)="slice()" class="loadMore" [disabled]="checkSizeSmall()">{{ \'DECREASE_SIZE\' | translate}}</button>\n\n          </ion-col>\n\n          <ion-col col-6>\n\n            <button ion-button round (click)="expand()" class="loadMore" [disabled]="checkSizeBig()">{{ \'INCREASE_SIZE\' | translate}}</button>\n\n          </ion-col>\n\n        </ion-row>\n\n      </ion-grid>\n\n    </div>\n\n\n\n  </div>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Coding\Uni\PWA Projekt\progappjs\ionicApp\src\pages\list-master\list-master.html"*/
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */]) === "function" ? _a : Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */]) === "function" ? _b : Object])
    ], ListMasterPage);
    return ListMasterPage;
}());

//# sourceMappingURL=list-master.js.map

/***/ })

});
//# sourceMappingURL=12.js.map