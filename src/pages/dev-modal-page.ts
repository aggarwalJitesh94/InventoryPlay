import { Component} from '@angular/core';
import { NavController, NavParams, ViewController, Platform } from 'ionic-angular';


@Component({
  template: `
<ion-header (swipe)="swipeEvent($event)">
  <ion-toolbar color="primary">
    <ion-title>
      Developer Profiles
    </ion-title>
    <ion-buttons end>
      <button ion-button (click)="dismiss()">
        <ion-icon name="close"></ion-icon>
      </button>
    </ion-buttons>
  </ion-toolbar>
</ion-header>
<ion-content (swipe)="swipeEvent($event)">
  <ion-list *ngFor="let character of characters">
      <ion-item>
        <ion-avatar item-start>
          <img src="{{character.image}}">
        </ion-avatar>
        <h2>{{character.name}}</h2>
      </ion-item>
      <ion-item>
      Role
        <ion-note item-end>
          {{character.title}}
        </ion-note>
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
export class devModalPage {

  characters = [
      {
        name: 'Jitesh Aggarwal',
        image: 'assets/img/male.png',
        title: 'Analyst, IT',
        contact_number: 7838701651,
        contact_id: "Jitesh_Aggarwal@Dell.com"
      },
      {
        name: 'Hithesh B Sekhar',
        image: 'assets/img/H_male.jpg',
        title: 'Intern Undergrad 2, IT',
        contact_number: 9845868097,
        contact_id: "Hithesh_B_Sekhar@Dell.com"
      },
      {
        name: 'Aviral Soni',
        image: 'assets/img/A_male.jpg',
        title: 'Intern Undergrad 2, IT',
        contact_number: 9818453041,
        contact_id: "Aviral_Soni@Dell.com"
      }
    ];

  constructor(
    public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController
  ) {
    
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  swipeEvent(e){
    this.dismiss();
  }
}