import { Component } from '@angular/core';
import { ViewController, ModalController,AlertController } from 'ionic-angular';
import { tourModalPage} from './tour-modal-page';
import { devModalPage} from './dev-modal-page';


@Component({
  template: `
    <ion-list>
      <ion-list-header><ion-title color="primary">Options</ion-title></ion-list-header>
      <button ion-item (click)="onBulbClick()"><ion-icon name="bulb" color="primary"></ion-icon>
        Tutorial</button>
      <button ion-item (click)="showVersion()"><ion-icon name="information-circle" color="primary"></ion-icon>
        Version</button>
      <button ion-item (click)="showDevs()"><ion-icon name="code" color="primary"></ion-icon>
        Contact Developers</button>
      <button ion-item (click)="showGithub()"><ion-icon name="logo-github" color="primary"></ion-icon>
        GitHub Repo</button>
    </ion-list>
  `
})
export class PopoverPage {
  constructor(public alertCtrl: AlertController, public modalCtrl: ModalController, public viewCtrl: ViewController) {}

  close() {
    this.viewCtrl.dismiss();
  }

  onBulbClick() {
    let modal = this.modalCtrl.create(tourModalPage,{charNum:1});
    modal.present();
    this.viewCtrl.dismiss();
  }

  showVersion() {
    let alert = this.alertCtrl.create({
      title: 'Inventory Play v1.2017',
      subTitle: 'Hackathon Version',
      message: 'Thank you for using our App',
      buttons: ['OK']
    });
    alert.present();
  }

  showGithub() {
    let alertgit = this.alertCtrl.create({
      subTitle: 'Github controlled @jiteshAggarwal94',
      buttons: ['OK']
    });
    alertgit.present();
  }

  showDevs(){
    let modal = this.modalCtrl.create(devModalPage,{charNum:1});
    modal.present();
    this.viewCtrl.dismiss();
  }

}