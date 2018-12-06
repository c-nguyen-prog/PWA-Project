import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewTransactionPage } from './new-transaction';
import { TranslateModule } from '@ngx-translate/core';
@NgModule({
  declarations: [
    NewTransactionPage,
  ],
  imports: [
    IonicPageModule.forChild(NewTransactionPage),
    TranslateModule.forChild()
  ],
})
export class NewTransactionPageModule {}
