webpackJsonp([0],{

/***/ 343:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SignupPageModule", function() { return SignupPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__ = __webpack_require__(119);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(118);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__signup2__ = __webpack_require__(363);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var SignupPageModule = /** @class */ (function () {
    function SignupPageModule() {
    }
    SignupPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__signup2__["a" /* SignupPage2 */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_3__signup2__["a" /* SignupPage2 */]),
                __WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__["b" /* TranslateModule */].forChild()
            ],
            exports: [
                __WEBPACK_IMPORTED_MODULE_3__signup2__["a" /* SignupPage2 */]
            ]
        })
    ], SignupPageModule);
    return SignupPageModule;
}());

//# sourceMappingURL=signup2.module.js.map

/***/ }),

/***/ 363:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SignupPage2; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(118);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3____ = __webpack_require__(225);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__validators_age__ = __webpack_require__(364);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__validators_email__ = __webpack_require__(365);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var SignupPage2 = /** @class */ (function () {
    function SignupPage2(navCtrl, formBuilder) {
        this.navCtrl = navCtrl;
        this.formBuilder = formBuilder;
        this.submitAttempt = false;
        this.account = {
            title: 'Mr.',
            address: 'Vermont avenue',
            streetNum: '225',
            zipCode: '60385',
            city: "Sebring"
        };
        this.slideOneForm = formBuilder.group({
            firstName: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].maxLength(30), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].pattern('[a-zA-Z ]*'), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required])],
            lastName: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].maxLength(30), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].pattern('[a-zA-Z ]*'), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required])],
            age: ['', __WEBPACK_IMPORTED_MODULE_4__validators_age__["a" /* AgeValidator */].isValid]
        });
        this.slideTwoForm = formBuilder.group({
            email: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].pattern('[a-zA-Z]*')]), __WEBPACK_IMPORTED_MODULE_5__validators_email__["a" /* EmailValidator */].checkEmail],
            privacy: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            bio: ['']
        });
    }
    SignupPage2.prototype.next = function () {
        this.signupSlider.slideNext();
    };
    SignupPage2.prototype.prev = function () {
        this.signupSlider.slidePrev();
    };
    SignupPage2.prototype.save = function () {
        this.submitAttempt = true;
        if (!this.slideOneForm.valid) {
            this.signupSlider.slideTo(0);
        }
        else if (!this.slideTwoForm.valid) {
            this.signupSlider.slideTo(1);
        }
        else {
            console.log("success!");
            console.log(this.slideOneForm.value);
            console.log(this.slideTwoForm.value);
        }
    };
    /*
      constructor(public navCtrl: NavController,
    
                  public toastCtrl: ToastController,
                  public translateService: TranslateService) {
    
        this.translateService.get('SIGNUP_ERROR').subscribe((value) => {
          this.signupErrorString = value;
        })
      }
    /*
      doSignup() {
        // Attempt to login in through our User service
        let tempAccount = JSON.parse(JSON.stringify(this.account));
        tempAccount.password = new Hashes.SHA512().hex(tempAccount.password);
        this.user.signup(JSON.stringify(tempAccount)).subscribe((resp : any) => {
          console.log(resp);
          if (resp.status === "success") {
            console.log("Successfully created account")
          } else {
            console.log("email already existed")
          }
        }, (err) => {
    
          //this.navCtrl.push(MainPage);
    
          // Unable to sign up
          let toast = this.toastCtrl.create({
            message: this.signupErrorString,
            duration: 3000,
            position: 'top'
          });
          toast.present();
        });
      }
    */
    SignupPage2.prototype.forward = function () {
        var promise = this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3____["f" /* signup2 */], { title: this.account.title,
            address: this.account.address,
            streetNum: this.account.streetNum,
            zipCode: this.account.zipCode,
            city: this.account.city
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('signupSlider'),
        __metadata("design:type", Object)
    ], SignupPage2.prototype, "signupSlider", void 0);
    SignupPage2 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-signup',template:/*ion-inline-start:"C:\Coding\Uni\PWA Projekt\progappjs\ionicApp\src\pages\signup2\signup2.html"*/'<ion-header>\n\n\n\n  <ion-navbar>\n\n    <ion-title>{{ \'Register\' | translate }}</ion-title>\n\n    <ion-buttons start>\n\n      <button ion-button icon-left (click)="prev()"><ion-icon name="arrow-back"></ion-icon> Prev</button>\n\n    </ion-buttons>\n\n    <ion-buttons end>\n\n      <button ion-button icon-right (click)="next()">Next <ion-icon name="arrow-forward"></ion-icon></button>\n\n    </ion-buttons>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n\n\n<ion-content>\n\n\n\n  <ion-slides #signupSlider pager>\n\n\n\n    <ion-slide>\n\n\n\n      <p *ngIf="submitAttempt" style="color: #ea6153;">Please fill out all details accurately.</p>\n\n\n\n      <ion-list no-lines>\n\n\n\n        <form [formGroup]="slideOneForm">\n\n\n\n          <ion-item>\n\n            <ion-label floating>First Name</ion-label>\n\n            <ion-input formControlName="firstName" type="text" [class.invalid]="!slideOneForm.controls.firstName.valid && (slideOneForm.controls.firstName.dirty || submitAttempt)"></ion-input>\n\n          </ion-item>\n\n\n\n          <ion-item *ngIf="!slideOneForm.controls.firstName.valid  && (slideOneForm.controls.firstName.dirty || submitAttempt)">\n\n            <p>Please enter a valid name.</p>\n\n          </ion-item>\n\n\n\n          <ion-item>\n\n            <ion-label floating>Last Name</ion-label>\n\n            <ion-input formControlName="lastName" type="text" [class.invalid]="!slideOneForm.controls.lastName.valid && (slideOneForm.controls.age.dirty || submitAttempt)"></ion-input>\n\n          </ion-item>\n\n\n\n          <ion-item *ngIf="!slideOneForm.controls.lastName.valid  && (slideOneForm.controls.lastName.dirty || submitAttempt)">\n\n            <p>Please enter a valid name.</p>\n\n          </ion-item>\n\n\n\n          <ion-item>\n\n            <ion-label floating>Age</ion-label>\n\n            <ion-input formControlName="age" type="number" [class.invalid]="!slideOneForm.controls.age.valid && (slideOneForm.controls.age.dirty || submitAttempt)"></ion-input>\n\n          </ion-item>\n\n\n\n          <ion-item *ngIf="!slideOneForm.controls.age.valid  && (slideOneForm.controls.age.dirty || submitAttempt)">\n\n            <p>Please enter a valid age.</p>\n\n          </ion-item>\n\n\n\n        </form>\n\n\n\n      </ion-list>\n\n\n\n    </ion-slide>\n\n\n\n    <ion-slide>\n\n\n\n      <ion-list no-lines>\n\n\n\n        <form [formGroup]="slideTwoForm">\n\n\n\n          <ion-item>\n\n            <ion-label floating>Email</ion-label>\n\n            <ion-input [class.invalid]="!slideTwoForm.controls.email.valid && (slideTwoForm.controls.email.dirty || submitAttempt)" formControlName="email" type="text"></ion-input>\n\n          </ion-item>\n\n\n\n          <ion-item *ngIf="slideTwoForm.controls.email.pending">\n\n            <p>Checking email...</p>\n\n          </ion-item>\n\n\n\n          <ion-item *ngIf="!slideTwoForm.controls.email.valid && !slideTwoForm.controls.email.pending && (slideTwoForm.controls.email.dirty || submitAttempt)">\n\n            <p>Sorry, that email can not be used!</p>\n\n          </ion-item>\n\n\n\n          <ion-item>\n\n            <ion-label floating>Privacy</ion-label>\n\n            <ion-select [class.invalid]="!slideTwoForm.controls.privacy.valid && (slideTwoForm.controls.privacy.dirty || submitAttempt)" formControlName="privacy">\n\n              <ion-option value="public" checked="true">Public</ion-option>\n\n              <ion-option value="friends">Friends Only</ion-option>\n\n              <ion-option value="private">Private</ion-option>\n\n            </ion-select>\n\n          </ion-item>\n\n\n\n          <ion-item>\n\n            <ion-label floating>Bio</ion-label>\n\n            <ion-textarea formControlName="bio"></ion-textarea>\n\n          </ion-item>\n\n\n\n        </form>\n\n\n\n      </ion-list>\n\n\n\n      <button ion-button full color="primary" (click)="save()">Create Account!</button>\n\n\n\n    </ion-slide>\n\n\n\n  </ion-slides>\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n<!--\n\n\n\n\n\n\n\n\n\n\n\n\n\n  <div class="signup-form">\n\n    <form (submit)="doSignup()">\n\n      <ion-list>\n\n\n\n        <ion-item>\n\n          <ion-label fixed>{{ \'NAME\' | translate }}</ion-label>\n\n          <ion-input type="text" [(ngModel)]="account.name" name="firstName"></ion-input>\n\n        </ion-item>\n\n\n\n        <ion-item>\n\n          <ion-label fixed>{{ \'Surname\' | translate }}</ion-label>\n\n          <ion-input type="text" [(ngModel)]="account.surName" name="lastName"></ion-input>\n\n        </ion-item>\n\n\n\n        <ion-item>\n\n          <ion-label fixed>{{ \'EMAIL\' | translate }}</ion-label>\n\n          <ion-input type="email" [(ngModel)]="account.email" name="email"></ion-input>\n\n        </ion-item>\n\n\n\n       \n\n        Want to add a Username? Here you go:\n\n\n\n        <ion-item>\n\n          <ion-label floating>Username</ion-label>\n\n          <ion-input type="text" [(ngModel)]="account.username" name="username"></ion-input>\n\n        </ion-item>\n\n\n\n\n\n        <ion-item>\n\n          <ion-label fixed>{{ \'PASSWORD\' | translate }}</ion-label>\n\n          <ion-input type="password" [(ngModel)]="account.password" name="password"></ion-input>\n\n        </ion-item>\n\n\n\n        <div padding>\n\n          <button ion-button color="primary" block>{{ \'SIGNUP_BUTTON\' | translate }}</button>\n\n          <button ion-button block (click)="push()"> {{ \'NEXT\' | translate }} </button>\n\n\n\n        </div>\n\n\n\n      </ion-list>\n\n    </form>\n\n  </div>\n\n -->\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Coding\Uni\PWA Projekt\progappjs\ionicApp\src\pages\signup2\signup2.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */]])
    ], SignupPage2);
    return SignupPage2;
}());

//# sourceMappingURL=signup2.js.map

/***/ }),

/***/ 364:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AgeValidator; });
var AgeValidator = /** @class */ (function () {
    function AgeValidator() {
    }
    AgeValidator.isValid = function (control) {
        if (isNaN(control.value)) {
            return {
                "not a number": true
            };
        }
        if (control.value % 1 !== 0) {
            return {
                "not a whole number": true
            };
        }
        if (control.value < 18) {
            return {
                "too young": true
            };
        }
        if (control.value > 120) {
            return {
                "Are you really that old? Seriously?": true
            };
        }
        return null;
    };
    return AgeValidator;
}());

//# sourceMappingURL=age.js.map

/***/ }),

/***/ 365:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EmailValidator; });
var EmailValidator = /** @class */ (function () {
    function EmailValidator() {
    }
    EmailValidator.checkEmail = function (control) {
        return new Promise(function (resolve) {
            //Fake a slow response from server
            setTimeout(function () {
                if (control.value.toLowerCase() === "greg") {
                    resolve({
                        "email address already taken": true
                    });
                }
                else {
                    resolve(null);
                }
            }, 2000);
        });
    };
    return EmailValidator;
}());

//# sourceMappingURL=email.js.map

/***/ })

});
//# sourceMappingURL=0.js.map