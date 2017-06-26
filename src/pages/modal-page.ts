import { Component} from '@angular/core';
import { NavController, NavParams, ViewController, Platform } from 'ionic-angular';


@Component({
  template: `
<ion-header (swipe)="swipeEvent($event)">
  <ion-toolbar color="primary">
    <ion-title>
      Contact Details
    </ion-title>
    <ion-buttons end>
      <button ion-button (click)="dismiss()">
        <ion-icon name="close"></ion-icon>
      </button>
    </ion-buttons>
  </ion-toolbar>
</ion-header>
<ion-content (swipe)="swipeEvent($event)">
  <ion-list>
      <ion-item>
        <ion-avatar item-start>
          <img src="{{character.image}}">
        </ion-avatar>
        <h2>{{character.name}}</h2>
      </ion-item>
      <ion-item>
      Contact Number
        <ion-note item-end>
          {{character.contact_number}}
        </ion-note>
      </ion-item>
      <ion-item>
        Email Address:
        <ion-note item-end>
          {{character.contact_id}}
        </ion-note>
      </ion-item>
  </ion-list>
</ion-content>
`
})
export class ModalPage {
  character;

  constructor(
    public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController
  ) {
    var characters = [
      {
        name: 'Hithesh B Sekhar',
        image: 'assets/img/male.png',
        contact_number: 9845868097,
        contact_id: "Hithesh_B_Sekhar@Dell.com"
      },
      {
        name: 'Indumathi R',
        image: 'assets/img/female.png',
        contact_number: 9632226881,
        contact_id: "Indumathi_R@Dell.com"
      },
      {
        name: 'Jitesh Aggarwal',
        image: 'assets/img/male.png',
        contact_number: 7838701651,
        contact_id: "Jitesh_Aggarwal@Dell.com"
      },
      {
        name: 'Aviral Soni',
        image: 'assets/img/male.png',
        contact_number: 9818453041,
        contact_id: "Aviral_Soni@Dell.com"
      },
      {
        name: 'Naveen Kumar',
        image: 'assets/img/male.png',
        contact_number: 9620469369,
        contact_id: "Naveen_K_Calich@Dell.com"
      },
      {
        name: 'Gopinath Annamalai',
        image: 'assets/img/male.png',
        contact_number: 9980562110,
        contact_id: "Annamalai_G@Dell.com"
      }
    ];



    this.character = characters[this.params.get('charNum')];
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  swipeEvent(e){
    this.dismiss();
  }
}