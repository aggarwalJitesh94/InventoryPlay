  import { Component,ViewChild } from '@angular/core';
import { NavController, MenuController, PopoverController,ModalController } from 'ionic-angular';
import { Chart } from 'chart.js';
import { StatusBar } from '@ionic-native/status-bar';
import { PopoverPage } from '../my-pop-over';
import { ModalPage } from '../modal-page';

@Component({
  selector: 'page-startHome',
  templateUrl: 'startHome.html'
})
export class startHomePage {

  public lineChartInv: any;
  @ViewChild('lineCanvasInv') lineCanvasInv;

  colors : ['rgba(255,99,132,1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'];

  constructor(public modalCtrl: ModalController,public popoverCtrl: PopoverController, public menuCtrl: MenuController, public navCtrl: NavController, private statusBar: StatusBar) {
    this.statusBar.backgroundColorByHexString("#982A5D");

  }


   presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopoverPage);
    popover.present({
      ev: myEvent
    });
  }

  refresh(){
        this.navCtrl.setRoot(this.navCtrl.getActive().component);
    }


  slides = [
    {
      title: "Welcome to Inventory Play!",
      description: "The <b>Inventory Play</b> mobile application showcases a number of useful components that are included for various users in Business and IT. It is a one-stop shop for anything critical pertaining to inventory.",
      image: "assets/img/home.gif",
    },
  ];

  ionViewDidLoad(){
  this.lineChartInv = new Chart(this.lineCanvasInv.nativeElement, {
  type: 'line',
  data: {
    labels: ["00:00","03:00","06:00","09:00","12:00","15:00","18:00","21:00"],
    datasets: [{ 
        data: [86,114,106,111,133,221,783,2478],
        label: "AM2GP",
        borderColor: 'rgba(255,99,132,1)',
        fill: false
      }, { 
        data: [282,350,411,502,635,1402,3700,5267],
        label: "BHM2GP",
        borderColor: 'rgba(54, 162, 235, 1)',
        fill: false
      }, { 
        data: [168,178,190,276,408,547,675,734],
        label: "DM2GP",
        borderColor: 'rgba(255, 206, 86, 1)',
        fill: false
      }, { 
        data: [40,20,10,24,74,167,508,784],
        label: "EM2GP",
        borderColor:    'rgba(75, 192, 192, 1)',
        fill: false
      }, { 
        data: [6,3,7,26,82,172,312,433],
        label: "MM2GP",
        borderColor: 'rgba(153, 102, 255, 1)',
        fill: false
      }, { 
        data: [6,3,7,26,82,172,312,433],
        label: "PM2GP",
        borderColor: 'rgba(255, 159, 64, 1)',
        fill: false
      }
    ]
  },
  options: {
                legend: {
                    display: true,
                        position: 'bottom',
                        },
                // Container for pan options
                pan: {
                    // Boolean to enable panning
                    enabled: true,
                    // Panning directions. Remove the appropriate direction to disable 
                    // Eg. 'y' would only allow panning in the y direction
                    mode: 'xy'
                },

                // Container for zoom options
                zoom: {
                    // Boolean to enable zooming
                    enabled: true,

                    // Zooming directions. Remove the appropriate direction to disable 
                    // Eg. 'y' would only allow zooming in the y direction
                    mode: 'xy',
                }
  }
});
}
}
