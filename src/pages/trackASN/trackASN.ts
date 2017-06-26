import { Component, ViewChild, OnInit } from '@angular/core';
import { NavController, LoadingController,AlertController, PopoverController } from 'ionic-angular';
import { Chart } from 'chart.js';
import { trackASNService } from '../../app/services/trackASN.service';  
import { ASNResultPage } from '../ASNResult/ASNResult';
import { PopoverPage } from '../my-pop-over';

@Component({
  selector: 'page-trackASN',
  templateUrl: 'trackASN.html'
})
export class trackASNPage {

  public resultASN: any;
  loading;
  public trans_type;
  public asn_id;
  public ASN_Flow;
  public svc_tag;
  public screenSelect;

  public radarChartODM:any;
  public radarChart3PL:any;

  public polarChartErrors: any;


  @ViewChild('radarCanvasODM') radarCanvasODM;
  @ViewChild('radarCanvas3PL') radarCanvas3PL;
  @ViewChild('polarCanvasErrors') polarCanvasErrors;

  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopoverPage);
    popover.present({
      ev: myEvent
    });
  }

  refresh(){
        this.navCtrl.setRoot(this.navCtrl.getActive().component);
    }

    
  constructor(public popoverCtrl: PopoverController, private alertCtrl: AlertController, public loadingCtrl: LoadingController, public navCtrl: NavController, private ASNService: trackASNService) {
    this.screenSelect = "ASNStatistics";
  }

  ngOnInit(){

  }

  ngAfterViewInit(){
   this.createCharts();
  }


  createCharts(){
     this.radarChartODM = new Chart(this.radarCanvasODM.nativeElement, {
    type: 'radar',
    data: {
      labels: ["Error %", "Reprocessed %", "In Progress %", "Completed %"],
      datasets: [
        {
          label: "APJ",
          fill: true,
          backgroundColor: "rgba(255, 206, 86,0.2)",
          borderColor: "rgba(255, 206, 86, 1)",
          pointBorderColor: "#ffffff",
          pointBackgroundColor: "rgba(255, 206, 86, 1)",
          data: [5,1,87.57,15.22]
        }, {
          label: "DAO",
          fill: true,
          backgroundColor: "rgba(54, 162, 235,0.2)",
          borderColor: "rgba(54, 162, 235,1)",
          pointBorderColor: "#ffffff",
          pointBackgroundColor: "rgba(54, 162, 235,1)",
          data: [2,11,83.128,27.58]
        }, {
          label: "EMEA",
          fill: true,
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          borderColor: "rgba(255,99,132,1)",
          pointBorderColor: "#ffffff",
          pointBackgroundColor: "rgba(255, 99, 132,1)",
          data: [64,5,33.95,17.96]
        }

      ]
    },
    options: {
     legend: {
                    maintainAspectRatio: false,
                    display: true,
                        position: 'bottom',
                            labels: {

                            }
                        },
    }
});

  this.radarChart3PL = new Chart(this.radarCanvas3PL.nativeElement, {
    type: 'radar',
    data: {
      labels: ["Error %", "Reprocessed %", "Success %"],
      datasets: [
        {
          label: "APJ",
          fill: true,
          backgroundColor: "rgba(255, 206, 86,0.2)",
          borderColor: "rgba(255, 206, 86, 1)",
          pointBorderColor: "#ffffff",
          pointBackgroundColor: "rgba(255, 206, 86, 1)",
          data: [5,0,100]
        }, {
          label: "DAO",
          fill: true,
          backgroundColor: "rgba(54, 162, 235,0.2)",
          borderColor: "rgba(54, 162, 235,1)",
          pointBorderColor: "#ffffff",
          pointBackgroundColor: "rgba(54, 162, 235,1)",
          data: [1,0.092,99.71]
        }, {
          label: "EMEA",
          fill: true,
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          borderColor: "rgba(255,99,132,1)",
          pointBorderColor: "#ffffff",
          pointBackgroundColor: "rgba(255, 99, 132,1)",
          data: [3,0,100]
        }

      ]
    },
    options: {
     legend: {
                    maintainAspectRatio: false,
                    display: true,
                        position: 'bottom',
                            labels: {

                            }
                        },
    }
});

  this.polarChartErrors = new Chart(this.polarCanvasErrors.nativeElement, {
    type: 'polarArea',
    data: {
      labels: ["3PL EMEA", "3PL DAO", "3PL APJ", "ODM EMEA", "ODM DAO", "ODM APJ"],
      datasets: [
        {
          label: "Error (Count)",
          backgroundColor: ['rgba(255,99,132,1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'],
          data: [2178,1267,734,784,433,310]
        }
      ]
    },
    options: {
      legend: {
                    maintainAspectRatio: false,
                    display: true,
                        position: 'bottom',
                        },
      title: {
        display: true,
      }
    }
});
  }

  try_statistics(){
    setTimeout(() => {
      this.createCharts();
    }, 500);
  }

  try_track_ASN(){

  }


  ASNResult(){
    console.log(this.ASN_Flow + " " + this.svc_tag + " " + this.asn_id);
      if(this.ASN_Flow==null){
        this.presentAlert("Missing Value!","Please select the ASN FLow to Proceed");
      }
      else if(this.asn_id==null && this.svc_tag==null){
        this.presentAlert("Missing Value!","Enter either a valid ASN ID or Service Tag to Proceed");
      }
      else if(this.svc_tag!=null && this.svc_tag.length<5 && (this.asn_id==null || this.asn_id.length<2)){
        this.presentAlert("Missing Value!","Enter either a valid ASN ID or Service Tag to Proceed");
      }
      else if(this.asn_id!=null && this.asn_id.length<2 && (this.svc_tag==null || this.svc_tag.length<5)){
        this.presentAlert("Missing Value!","Enter either a valid ASN ID or Service Tag to Proceed");
      }
      else{
      this.trans_type = this.ASN_Flow;
      this.navCtrl.push(ASNResultPage, {
        asn_id:this.asn_id,
        svc_tag:this.svc_tag,
        trans_type:this.trans_type
      })
      }
  }


  presentAlert(title,message) {
  let alert = this.alertCtrl.create({
    title: title,
    subTitle: message,
    buttons: ['Dismiss']
  });
  alert.present();
}

  ionViewDidLoad() {

}


}
