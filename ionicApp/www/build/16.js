webpackJsonp([16],{

/***/ 333:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContactPageModule", function() { return ContactPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(118);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__contact__ = __webpack_require__(353);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__ = __webpack_require__(119);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var ContactPageModule = /** @class */ (function () {
    function ContactPageModule() {
    }
    ContactPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__contact__["a" /* ContactPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__contact__["a" /* ContactPage */]),
                __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__["b" /* TranslateModule */].forChild()
            ],
            exports: [
                __WEBPACK_IMPORTED_MODULE_2__contact__["a" /* ContactPage */]
            ]
        })
    ], ContactPageModule);
    return ContactPageModule;
}());

//# sourceMappingURL=contact.module.js.map

/***/ }),

/***/ 353:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ContactPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(118);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers__ = __webpack_require__(120);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__ = __webpack_require__(119);
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
 * Generated class for the ContactPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ContactPage = /** @class */ (function () {
    function ContactPage(navCtrl, navParams, user, toastCtrl, translateService) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.user = user;
        this.toastCtrl = toastCtrl;
        this.translateService = translateService;
        this.contact = {
            name: "",
            email: "",
            phoneNumber: "",
            message: ""
        };
        this.translateService.get('SIGNUP_ERROR').subscribe(function (value) {
            _this.contactStringError = value;
        });
    }
    ContactPage.prototype.submitMessage = function () {
        var _this = this;
        this.user.contact(JSON.stringify(this.contact)).subscribe(function (resp) {
            console.log(resp);
            if (resp.status === "success") {
                console.log("Thank you! We will contact you immediately!");
            }
            else {
                console.log("Something went wrong! Please try again!");
            }
        }, function (err) {
            var toast = _this.toastCtrl.create({
                message: _this.contactStringError,
                duration: 3000,
                position: 'top'
            });
            toast.present();
        });
    };
    ContactPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ContactPage');
    };
    ContactPage.prototype.login = function () {
        this.navCtrl.push('LoginPage');
    };
    ContactPage.prototype.signup = function () {
        this.navCtrl.push('SignupPage');
    };
    ContactPage.prototype.about = function () {
        this.navCtrl.push('AboutPage');
    };
    ContactPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-contact',template:/*ion-inline-start:"C:\Coding\Uni\PWA Projekt\progappjs\ionicApp\src\pages\contact\contact.html"*/'<ion-header>\n\n\n\n  <ion-navbar>\n\n    <button ion-button icon-only menuToggle color="white" class="show-small">\n\n      <ion-icon name="menu" class="custom-icon"></ion-icon>\n\n    </button>\n\n    <ion-buttons left class="hide-small">\n\n      <ion-grid>\n\n        <ion-row>\n\n          <ion-col col-6>\n\n            <button ion-button (click)="about()" class="signup" round>{{ \'ABOUTUS\' | translate }}</button>\n\n          </ion-col>\n\n          <ion-col col-6>\n\n          </ion-col>\n\n        </ion-row>\n\n      </ion-grid>\n\n    </ion-buttons>\n\n    <ion-buttons right class="hide-small">\n\n      <ion-grid>\n\n        <ion-row>\n\n          <ion-col col-6>\n\n            <button ion-button (click)="login()" class="login" round>{{ \'LOGIN\' | translate }}\n\n              <ion-icon class="login-icon" name="log-in"></ion-icon>\n\n            </button>\n\n          </ion-col>\n\n          <ion-col col-6>\n\n            <button ion-button (click)="signup()" class="signup" round>{{ \'SIGNUP\' | translate }}</button>\n\n          </ion-col>\n\n        </ion-row>\n\n      </ion-grid>\n\n    </ion-buttons>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content>\n\n\n\n\n\n  <div class="splash-bg">\n\n\n\n    <div class="getintouchHead">\n\n      <h1 class="getintouchH1">Get in Touch</h1>\n\n      <p class="infoGetintouch">Please fill out the quick form an we will be in touch in lightning speed</p>\n\n    </div>\n\n\n\n    <div class="container">\n\n        <form class="form" (submit)="submitMessage()">\n\n\n\n\n\n          <ion-list>\n\n\n\n            <ion-item>\n\n              <ion-label floating>{{ \'C_NAME\' | translate }}</ion-label>\n\n              <ion-input type="text" [(ngModel)]="contact.name" name="c_name"></ion-input>\n\n            </ion-item>\n\n            <ion-item>\n\n              <ion-label floating>{{ \'C_MAIL\' | translate }}</ion-label>\n\n              <ion-input type="email" [(ngModel)]="contact.email" name="c_mail"></ion-input>\n\n            </ion-item>\n\n            <ion-item>\n\n              <ion-label floating>{{ \'C_PHONENUMBER\' | translate }}</ion-label>\n\n              <ion-input type="text" [(ngModel)]="contact.phoneNumber" name="c_phonenumber"></ion-input>\n\n            </ion-item>\n\n            <ion-item>\n\n              <ion-label floating>{{ \'C_MESSAGE\' | translate }}</ion-label>\n\n              <ion-input width="50" type="text" [(ngModel)]="contact.message" name="c_message" >\n\n              </ion-input>\n\n            </ion-item>\n\n          </ion-list>\n\n          <ion-list>\n\n\n\n            <div class="submit-button" padding>\n\n              <button ion-button color="primary" class="submit-end" round>{{ \'C_SUBMIT\' | translate }}</button>\n\n            </div>\n\n\n\n          </ion-list>\n\n\n\n\n\n        </form>\n\n    </div>\n\n\n\n    <div class="footer">\n\n        <h1 ion-text class="copyright">\&copy; 2018, Digibank Inc</h1>\n\n    </div>\n\n  </div>\n\n\n\n</ion-content>\n\n\n\n'/*ion-inline-end:"C:\Coding\Uni\PWA Projekt\progappjs\ionicApp\src\pages\contact\contact.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__providers__["e" /* User */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__["c" /* TranslateService */]])
    ], ContactPage);
    return ContactPage;
}());

//# sourceMappingURL=contact.js.map

/***/ })

});
//# sourceMappingURL=16.js.map