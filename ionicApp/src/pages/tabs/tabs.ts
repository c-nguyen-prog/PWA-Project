import {Component, ViewChild} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, Nav, NavController, MenuController} from 'ionic-angular';

import { Tab1Root, Tab2Root, Tab3Root } from '../';

interface PageItem {
  title: string
  component: any
}
type PageList = PageItem[]

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})

export class TabsPage {
  tab1Root: any = Tab1Root;
  tab2Root: any = Tab2Root;
  tab3Root: any = Tab3Root;

  tab1Title = " ";
  tab2Title = " ";
  tab3Title = " ";

  @ViewChild(Nav) nav: Nav;

  rootPage= 'ListMasterPage';

  overviewPages: PageList;

  constructor(public navCtrl: NavController, public translateService: TranslateService) {
    translateService.get(['TAB1_TITLE', 'TAB2_TITLE', 'TAB3_TITLE']).subscribe(values => {
      this.tab1Title = values['TAB1_TITLE'];
      this.tab2Title = values['TAB2_TITLE'];
      this.tab3Title = values['TAB3_TITLE'];
    });

    this.overviewPages = [
      { title: 'Overview', component: 'ListMasterPage' },
      { title: 'Search', component: 'SearchPage' },
      { title: 'Personal Data', component: 'SettingsPage'}
    ];
  }

  openPage(page: PageItem) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
