import { Component } from '@angular/core';

import { trackASNPage } from '../trackASN/trackASN';
import { scanSVCPage } from '../scanSVC/scanSVC';
import { healthcheckPage } from '../healthcheck/healthcheck';
import { DellAssistantPage } from '../DellAssistant/DellAssistant';
import { startHomePage } from '../startHome/startHome';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = startHomePage;
  tab2Root = scanSVCPage;
  tab3Root = trackASNPage;
  tab4Root = healthcheckPage;
  tab5Root = DellAssistantPage;

  constructor() {

  }
}
