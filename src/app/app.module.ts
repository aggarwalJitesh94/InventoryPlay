import { NgModule, ErrorHandler } from '@angular/core';
import { HttpModule } from '@angular/http';

import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { trackASNPage } from '../pages/trackASN/trackASN';
import { scanSVCPage } from '../pages/scanSVC/scanSVC';
import { healthcheckPage } from '../pages/healthcheck/healthcheck';
import { TabsPage } from '../pages/tabs/tabs';
import { DellAssistantPage } from '../pages/DellAssistant/DellAssistant';
import { startHomePage } from '../pages/startHome/startHome';

import { ASNResultPage } from '../pages/ASNResult/ASNResult';
import { ASNDetailResultPage } from '../pages/ASNDetailResult/ASNDetailResult';
import { ASNErrorResultPage } from '../pages/ASNErrorResult/ASNErrorResult';
import { PopoverPage } from '../pages/my-pop-over';
import { ModalPage } from '../pages/modal-page';
import { tourModalPage } from '../pages/tour-modal-page';
import { devModalPage } from '../pages/dev-modal-page';

import { SVCResultPage } from '../pages/SVCResult/SVCResult';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SpeechRecognition  } from '@ionic-native/speech-recognition';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Push} from '@ionic-native/push';


import { ChartsModule } from 'ng2-charts';


@NgModule({
  declarations: [
    MyApp,
    trackASNPage,
    scanSVCPage,
    healthcheckPage,
    TabsPage,
    DellAssistantPage,
    startHomePage,
    ASNResultPage,
    ASNDetailResultPage,
    ASNErrorResultPage,
    SVCResultPage,
    PopoverPage,
    ModalPage,
    tourModalPage,
    devModalPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    ChartsModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    trackASNPage,
    scanSVCPage,
    healthcheckPage,
    TabsPage,
    DellAssistantPage,
    startHomePage,
    ASNResultPage,
    ASNDetailResultPage,
    ASNErrorResultPage,
    SVCResultPage,
    PopoverPage,
    ModalPage,
    tourModalPage,
    devModalPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    SpeechRecognition,
    BarcodeScanner,
    Push,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
