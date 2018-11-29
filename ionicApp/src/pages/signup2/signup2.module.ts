import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { SignupPage2} from './signup2';

@NgModule({
  declarations: [
    SignupPage2,
  ],
  imports: [
    IonicPageModule.forChild(SignupPage2),
    TranslateModule.forChild()
  ],
  exports: [
    SignupPage2
  ]
})
export class SignupPageModule { }
