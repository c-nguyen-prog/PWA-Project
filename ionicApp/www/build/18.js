webpackJsonp([18],{

/***/ 330:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AboutPageModule", function() { return AboutPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(118);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__about__ = __webpack_require__(350);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__ = __webpack_require__(119);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var AboutPageModule = /** @class */ (function () {
    function AboutPageModule() {
    }
    AboutPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__about__["a" /* AboutPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__about__["a" /* AboutPage */]),
                __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__["b" /* TranslateModule */].forChild()
            ],
            exports: [
                __WEBPACK_IMPORTED_MODULE_2__about__["a" /* AboutPage */]
            ]
        })
    ], AboutPageModule);
    return AboutPageModule;
}());

//# sourceMappingURL=about.module.js.map

/***/ }),

/***/ 350:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AboutPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(118);
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
 * Generated class for the AboutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var AboutPage = /** @class */ (function () {
    function AboutPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    AboutPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad AboutPage');
    };
    AboutPage.prototype.login = function () {
        this.navCtrl.push('LoginPage');
    };
    AboutPage.prototype.signup = function () {
        this.navCtrl.push('SignupPage');
    };
    AboutPage.prototype.contact = function () {
        this.navCtrl.push('ContactPage');
    };
    AboutPage.prototype.about = function () {
        this.navCtrl.push('AboutPage');
    };
    AboutPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-about',template:/*ion-inline-start:"C:\Coding\Uni\PWA Projekt\progappjs\ionicApp\src\pages\about\about.html"*/'<ion-header class="header">\n\n  <ion-navbar>\n\n    <button ion-button icon-only menuToggle color="white" class="show-small">\n\n      <ion-icon name="menu" class="custom-icon"></ion-icon>\n\n    </button>\n\n    <ion-buttons left class="hide-small">\n\n      <ion-grid>\n\n        <ion-row>\n\n          <ion-col col-6>\n\n            <button ion-button (click)="contact()" class="signup" round>{{ \'CONTACTUS\' | translate }}</button>\n\n          </ion-col>\n\n          <ion-col col-6>\n\n          </ion-col>\n\n        </ion-row>\n\n      </ion-grid>\n\n    </ion-buttons>\n\n    <ion-buttons right class="hide-small">\n\n      <ion-grid>\n\n        <ion-row>\n\n          <ion-col col-6>\n\n            <button ion-button (click)="login()" class="login" round>{{ \'LOGIN\' | translate }}\n\n              <ion-icon class="login-icon" name="log-in"></ion-icon>\n\n            </button>\n\n          </ion-col>\n\n          <ion-col col-6>\n\n            <button ion-button (click)="signup()" class="signup" round>{{ \'SIGNUP\' | translate }}</button>\n\n          </ion-col>\n\n        </ion-row>\n\n      </ion-grid>\n\n    </ion-buttons>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content>\n\n\n\n  <div class="splash-bg">\n\n\n\n    <div class="container">\n\n      <ion-scroll class="container-scroll" scrollY="true">\n\n\n\n        <ion-grid>\n\n          <ion-row>\n\n            <ion-col>\n\n            </ion-col>\n\n\n\n            <ion-col col-12 class="aboutUsBox">\n\n              <div class="about">\n\n\n\n                <div class="auText">\n\n\n\n                  <h2 class="theHistoryHead">{{\'AU_THEHISTORY\' | translate}}</h2>\n\n                  <p class="text2018">{{\'AU_HISTORY_TXT1\'|translate}}</p>\n\n                  <p class="text2018">{{\'AU_HISTORY_TXT2\'|translate}}</p>\n\n\n\n                  <h2 class="teamHead">{{\'AU_TEAM\'|translate}}</h2>\n\n                  <ion-grid>\n\n                    <ion-row>\n\n                      <ion-col col-md-6 class="team">\n\n                        <ion-list>\n\n                          <ion-item>\n\n                            <ion-avatar item-start>\n\n                              <img src="assets/img/speakers/eagle.jpg">\n\n                            </ion-avatar>\n\n                            <h2>Chi</h2>\n\n                            <p>{{\'AU_BACKDEV\'|translate}}</p>\n\n                          </ion-item>\n\n                          <ion-item>\n\n                            <ion-avatar item-start>\n\n                              <img src="assets/img/speakers/bear.jpg">\n\n                            </ion-avatar>\n\n                            <h2>Raakulan</h2>\n\n                            <p>{{\'AU_FRONTDEV\'|translate}}</p>\n\n                          </ion-item>\n\n                        </ion-list>\n\n                      </ion-col>\n\n                      <ion-col col-md-6 class="team">\n\n                        <ion-list>\n\n                          <ion-item>\n\n                            <ion-avatar item-start>\n\n                              <img src="assets/img/speakers/iguana.jpg">\n\n                            </ion-avatar>\n\n                            <h2>Santiago</h2>\n\n                            <p>{{\'AU_FRONTDEV\'|translate}}</p>\n\n                          </ion-item>\n\n                          <ion-item>\n\n                            <ion-avatar item-start>\n\n                              <img src="assets/img/speakers/giraffe.jpg">\n\n                            </ion-avatar>\n\n                            <h2>Simon</h2>\n\n                            <p>{{\'AU_FRONTDEV\'|translate}}</p>\n\n                          </ion-item>\n\n                        </ion-list>\n\n                      </ion-col>\n\n                    </ion-row>\n\n                  </ion-grid>\n\n                </div>\n\n\n\n              </div>\n\n            </ion-col>\n\n\n\n            <ion-col>\n\n            </ion-col>\n\n\n\n          </ion-row>\n\n        </ion-grid>\n\n      </ion-scroll>\n\n\n\n    </div>\n\n\n\n    <div class="footer">\n\n      <h1 ion-text class="copyright">\&copy; 2018, Digibank Inc</h1>\n\n    </div>\n\n\n\n  </div>\n\n\n\n</ion-content>\n\n\n\n'/*ion-inline-end:"C:\Coding\Uni\PWA Projekt\progappjs\ionicApp\src\pages\about\about.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */]])
    ], AboutPage);
    return AboutPage;
}());

//# sourceMappingURL=about.js.map

/***/ })

});
//# sourceMappingURL=18.js.map