import { Component} from '@angular/core';
import { NavController, NavParams, ViewController, Platform  } from 'ionic-angular';


@Component({
  template: `
  <img src="assets/img/s3.png" (tap)="tapEvent($event)" class="transparent image-modal fullscreen-image" />
`
})
export class tourModalPage {
  character;

  touchEvent(e){
        this.dismiss();
  }

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

  tapEvent(e){
    this.dismiss();
  }


}