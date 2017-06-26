import { Component, ViewChild} from '@angular/core';
import { NavController, LoadingController, ToastController, PopoverController } from 'ionic-angular';
import { Chart } from 'chart.js';
import { healthCheckService } from '../../app/services/healthcheck.service';
import { PopoverPage } from '../my-pop-over';


@Component({
  selector: 'page-healthcheck',
  templateUrl: 'healthcheck.html',
  providers: [healthCheckService]
})
export class healthcheckPage {


    present_toast(messageStr){
        let toast = this.toastCtrl.create({
                message: messageStr,
                duration: 3000,
                position: 'top'
              });

              toast.onDidDismiss(() => {
                console.log('Dismissed toast');
              });

              toast.present();
    }


    refresh(){
        this.navCtrl.setRoot(this.navCtrl.getActive().component);
    }

    barChartASN: any;
    barChartAgiletoGlovia: any;
    barChartRelief: any;
    barChartGPExtract: any;

    doughnutChartAM: any;
    doughnutChart2AM: any;
    doughnutChart2PM: any;
    doughnutChartPM: any;
    doughnutChartDM: any;
    doughnutChart2DM: any;
    doughnutChartEM: any;
    doughnutChart2EM: any;
    doughnutChartBM: any;
    doughnutChart2BM: any;
    doughnutChartMM: any;
    doughnutChart2MM: any;

    lineChart: any;

    resultSet: {};
    timeValue: string;
    values_from_db: any;

    loading: any;


	@ViewChild('barCanvas') barCanvas;
    @ViewChild('barCanvasAgileToGlovia') barCanvasAgileToGlovia;
    @ViewChild('barCanvasRelief') barCanvasRelief;
    @ViewChild('barCanvasGPExtract') barCanvasGPExtract;
    @ViewChild('doughnutCanvasAM') doughnutCanvasAM;
    @ViewChild('doughnutCanvas2AM') doughnutCanvas2AM;
    @ViewChild('doughnutCanvasPM') doughnutCanvasPM;
    @ViewChild('doughnutCanvas2PM') doughnutCanvas2PM;
    @ViewChild('doughnutCanvasDM') doughnutCanvasDM;
    @ViewChild('doughnutCanvas2DM') doughnutCanvas2DM;
    @ViewChild('doughnutCanvasEM') doughnutCanvasEM;
    @ViewChild('doughnutCanvas2EM') doughnutCanvas2EM;
    @ViewChild('doughnutCanvasBM') doughnutCanvasBM;
    @ViewChild('doughnutCanvas2BM') doughnutCanvas2BM;
    @ViewChild('doughnutCanvasMM') doughnutCanvasMM;
    @ViewChild('doughnutCanvas2MM') doughnutCanvas2MM;
    @ViewChild('lineCanvas') lineCanvas;
 
    slides = [{DB:"PM"},{},{},{},{},{}];

    presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopoverPage);
    popover.present({
      ev: myEvent
    });
  }

  constructor(public popoverCtrl: PopoverController, private toastCtrl: ToastController, public loadingCtrl: LoadingController, public navCtrl: NavController, public HealthChk: healthCheckService) {
      this.loading = this.loadingCtrl.create({
            content: 'Fetching Health Check Data. Please wait...',
            spinner: 'bubbles'
            });
      this.loading.present();
      try{
        this.HealthChk.getHCData("day").subscribe(response => {
        this.values_from_db = response;
        console.log(this.values_from_db);
        this.ViewDidLoad();
        this.loading.dismiss(); 
        },
        error => {
                this.loading.dismiss();
                this.present_toast("Error Occured while fetching data. Please try again.");
        }
        ); 
        }catch(Exception){
                this.loading.dismiss(); 
                this.present_toast("Internal error occured. Please try again. ");
        }


      this.timeValue = "day";
      this.resultSet = this.HealthChk.getHCLabels();
      //this.values_from_db = this.HealthChk.getHCValues("day");

      //this.values_from_db = this.HealthChk.getHCValues("day");
  }


  tryDay(){
    this.barChartASN.clear();
    this.barChartASN.destroy();
    this.barChartGPExtract.clear();
    this.barChartGPExtract.destroy();
    this.barChartAgiletoGlovia.clear();
    this.barChartAgiletoGlovia.destroy();
    this.barChartRelief.clear();
    this.barChartRelief.destroy();
    
    this.doughnutChartDM.clear();
    this.doughnutChartMM.clear();
    this.doughnutChartEM.clear();
    this.doughnutChartBM.clear();
    this.doughnutChartPM.clear();
    this.doughnutChartAM.clear();
    this.doughnutChart2DM.clear();
    this.doughnutChart2MM.clear();
    this.doughnutChart2EM.clear();
    this.doughnutChart2BM.clear();
    this.doughnutChart2PM.clear();
    this.doughnutChart2AM.clear();
    this.doughnutChartDM.destroy();
    this.doughnutChartMM.destroy();
    this.doughnutChartEM.destroy();
    this.doughnutChartBM.destroy();
    this.doughnutChartPM.destroy();
    this.doughnutChartAM.destroy();
    this.doughnutChart2DM.destroy();
    this.doughnutChart2MM.destroy();
    this.doughnutChart2EM.destroy();
    this.doughnutChart2BM.destroy();
    this.doughnutChart2PM.destroy();
    this.doughnutChart2AM.destroy();


    try{
        this.loading = this.loadingCtrl.create({
            content: 'Refreshing Health Check Data. Please wait...',
            spinner: 'bubbles'
            });
        this.loading.present();
        this.HealthChk.getHCData("day").subscribe(response => {
        this.values_from_db = response;
        console.log(this.values_from_db);
        this.ViewDidLoad();
        //this.values_from_db = response;
        //let keys = Object.keys(this.resultASN);
        this.loading.dismiss(); 
        }); 
        }catch(Exception){
                this.loading.dismiss(); 
                 let toast = this.toastCtrl.create({
                message: 'Error occured while fetching data. Please retry.',
                duration: 3000,
                position: 'top'
              });

              toast.onDidDismiss(() => {
                console.log('Dismissed toast');
              });

              toast.present();
        }
  }

  tryWeek(){
    this.barChartASN.clear();
    this.barChartASN.destroy();
    this.barChartGPExtract.clear();
    this.barChartGPExtract.destroy();
    this.barChartAgiletoGlovia.clear();
    this.barChartAgiletoGlovia.destroy();
    this.barChartRelief.clear();
    this.barChartRelief.destroy();

    this.doughnutChartDM.clear();
    this.doughnutChartMM.clear();
    this.doughnutChartEM.clear();
    this.doughnutChartBM.clear();
    this.doughnutChartPM.clear();
    this.doughnutChartAM.clear();
    this.doughnutChart2DM.clear();
    this.doughnutChart2MM.clear();
    this.doughnutChart2EM.clear();
    this.doughnutChart2BM.clear();
    this.doughnutChart2PM.clear();
    this.doughnutChart2AM.clear();
    this.doughnutChartDM.destroy();
    this.doughnutChartMM.destroy();
    this.doughnutChartEM.destroy();
    this.doughnutChartBM.destroy();
    this.doughnutChartPM.destroy();
    this.doughnutChartAM.destroy();
    this.doughnutChart2DM.destroy();
    this.doughnutChart2MM.destroy();
    this.doughnutChart2EM.destroy();
    this.doughnutChart2BM.destroy();
    this.doughnutChart2PM.destroy();
    this.doughnutChart2AM.destroy();

    try{
        this.loading = this.loadingCtrl.create({
            content: 'Refreshing Health Check Data. Please wait...',
            spinner: 'bubbles'
            });
        this.loading.present();
        this.HealthChk.getHCData("week").subscribe(response => {
        this.values_from_db = response;
        console.log(this.values_from_db);
        this.ViewDidLoad();
        //this.values_from_db = response;
        //let keys = Object.keys(this.resultASN);
        this.loading.dismiss(); 
        }); 
        }catch(Exception){
        this.loading.dismiss(); 
                 let toast = this.toastCtrl.create({
                message: 'Error occured while fetching data. Please retry.',
                duration: 3000,
                position: 'top'
              });

              toast.onDidDismiss(() => {
                console.log('Dismissed toast');
              });

              toast.present();
        }
  }

   ViewDidLoad() {
    
        this.barChartASN = new Chart(this.barCanvas.nativeElement, {
            type: 'bar',
            data: {
                labels: this.resultSet,
                datasets: [{
                    label: 'ASN received',
                    data: this.values_from_db._asn_values_day[0],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(255, 99, 132, 0.2)',
                        // 'rgba(153, 102, 255, 0.2)',
                        // 'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255,99,132,1)',
                        'rgba(255,99,132,1)',
                        'rgba(255,99,132,1)',
                        'rgba(255,99,132,1)',
                        'rgba(255,99,132,1)',
                        'rgba(255,99,132,1)',
                        // 'rgba(153, 102, 255, 1)',
                        // 'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 2
                },
                {
                    label: 'Val acked',
                    data: this.values_from_db._asn_values_day[1],
                    backgroundColor: [
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        // 'rgba(153, 102, 255, 0.2)',
                        // 'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(54, 162, 235, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(54, 162, 235, 1)',
                        // 'rgba(153, 102, 255, 1)',
                        // 'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 2
                },{
                    label: 'SN received',
                    data: this.values_from_db._asn_values_day[2],
                    backgroundColor: [
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        // 'rgba(153, 102, 255, 0.2)',
                        // 'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 206, 86, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(255, 206, 86, 1)',
                        // 'rgba(153, 102, 255, 1)',
                        // 'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 2
                },{
                    label: 'SN acked',
                    data: this.values_from_db._asn_values_day[3],
                    backgroundColor: [
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        // 'rgba(153, 102, 255, 0.2)',
                        // 'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(75, 192, 192, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(75, 192, 192, 1)',
                        // 'rgba(153, 102, 255, 1)',
                        // 'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 2
                }]
            },
            options: {
                legend: {
                    maintainAspectRatio: false,                    
                    display: true,
                        position: 'bottom',
                            labels: {

                            }
                        },
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero:true
                        }
                    }],
                    xAxes: [{
                        ticks: {
                            autoSkip: false
                        }
                    }]
                }
            }
 
        });

        this.doughnutChartAM = new Chart(this.doughnutCanvasAM.nativeElement, {
 
            type: 'doughnut',
            data: {
                labels: ["943 received", "ACK Sent"],
                datasets: [{
                    label: '# of Votes',
                    data:  this.values_from_db._mm_xfer[0],
                    backgroundColor: [
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                    ],
                    hoverBackgroundColor: [
                        'rgba(255, 159, 64, 1)',
                        'rgba(75, 192, 192, 1)',
                        
                    ],
                    borderWidth: 2
                }]
            },
            options: 
            {
            //      animation: {
            //         duration: 0 // also tried false
            //     },
            maintainAspectRatio: false,
            legend: {
                    display: true,
                        position: 'bottom',
                        },
            }
 
        });


        this.doughnutChart2AM = new Chart(this.doughnutCanvas2AM.nativeElement, {
 
            type: 'doughnut',
            data: {
                labels: ["858 received", "ACK Sent"],
                datasets: [{
                    label: '# of Votes',
                    data: this.values_from_db._mm_xfer[1],
                    backgroundColor: [
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                    ],
                    hoverBackgroundColor: [
                        'rgba(153, 102, 255, 1)',
                        'rgba(75, 192, 192, 1)',
                        
                    ],
                    borderWidth:2
                }]
            },
            options: {
             maintainAspectRatio: false,    
             legend: {
                    display: true,
                        position: 'bottom',
                        },
            }
 
        });



        this.doughnutChartDM = new Chart(this.doughnutCanvasDM.nativeElement, {
 
            type: 'doughnut',
            data: {
                labels: ["943 received", "ACK Sent"],
                datasets: [{
                    label: '# of Votes',
                    data: this.values_from_db._mm_xfer[2],
                    backgroundColor: [
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                    ],
                    hoverBackgroundColor: [
                        'rgba(255, 159, 64, 1)',
                        'rgba(75, 192, 192, 1)',
                        
                    ],
                    borderWidth:2 
                }]
            },
            options: {
                maintainAspectRatio: false,
                legend: {
                    display: true,
                        position: 'bottom',
                        },
            }
 
        });


        this.doughnutChart2DM = new Chart(this.doughnutCanvas2DM.nativeElement, {
 
            type: 'doughnut',
            data: {
                labels: ["858 received", "ACK Sent"],
                datasets: [{
                    label: '# of Votes',
                    data: this.values_from_db._mm_xfer[3],
                    backgroundColor: [
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                    ],
                    hoverBackgroundColor: [
                        'rgba(153, 102, 255, 1)',
                        'rgba(75, 192, 192, 1)',
                        
                    ],
                    borderWidth:2
                }]
            },
            options: {
                maintainAspectRatio: false,
                legend: {
                    display: true,
                        position: 'bottom',
                        },
            }
 
        });


        this.doughnutChartPM = new Chart(this.doughnutCanvasPM.nativeElement, {
 
            type: 'doughnut',
            data: {
                labels: ["943 received", "ACK Sent"],
                datasets: [{
                    label: '# of Votes',
                    data: this.values_from_db._mm_xfer[4],
                    backgroundColor: [
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                    ],
                    hoverBackgroundColor: [
                        'rgba(255, 159, 64, 1)',
                        'rgba(75, 192, 192, 1)',
                        
                    ],
                    borderWidth:2
                }]
            },
            options: {
                maintainAspectRatio: false,
                legend: {
                    display: true,
                        position: 'bottom',
                        },
            }
 
        });


        this.doughnutChart2PM = new Chart(this.doughnutCanvas2PM.nativeElement, {
 
            type: 'doughnut',
            data: {
                labels: ["858 received", "ACK Sent"],
                datasets: [{
                    label: '# of Votes',
                    data: this.values_from_db._mm_xfer[5],
                    backgroundColor: [
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                    ],
                    hoverBackgroundColor: [
                        'rgba(153, 102, 255, 1)',
                        'rgba(75, 192, 192, 1)',
                        
                    ],
                    borderWidth:2
                }]
            },
            options: {
                maintainAspectRatio: false,
                legend: {
                    display: true,
                        position: 'bottom',
                        },
            }
 
        });


        this.doughnutChartBM = new Chart(this.doughnutCanvasBM.nativeElement, {
 
            type: 'doughnut',
            data: {
                labels: ["943 received", "ACK Sent"],
                datasets: [{
                    label: '# of Votes',
                    data: this.values_from_db._mm_xfer[6],
                    backgroundColor: [
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                    ],
                    hoverBackgroundColor: [
                        'rgba(255, 159, 64, 1)',
                        'rgba(75, 192, 192, 1)',
                        
                    ],
                    borderWidth:2
                }]
            },
            options: {
                maintainAspectRatio: false,
                legend: {
                    display: true,
                        position: 'bottom',
                        },
            }
 
        });


        this.doughnutChart2BM = new Chart(this.doughnutCanvas2BM.nativeElement, {
 
            type: 'doughnut',
            data: {
                labels: ["858 received", "ACK Sent"],
                datasets: [{
                    label: '# of Votes',
                    data: this.values_from_db._mm_xfer[7],
                    backgroundColor: [
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                    ],
                    hoverBackgroundColor: [
                        'rgba(153, 102, 255, 1)',
                        'rgba(75, 192, 192, 1)',
                        
                    ],
                    borderWidth:2
                }]
            },
            options: {
                maintainAspectRatio: false,
                legend: {
                    display: true,
                        position: 'bottom',
                        },
            }
        });


        this.doughnutChartEM = new Chart(this.doughnutCanvasEM.nativeElement, {
 
            type: 'doughnut',
            data: {
                labels: ["943 received", "ACK Sent"],
                datasets: [{
                    label: '# of Votes',
                    data: this.values_from_db._mm_xfer[8],
                    backgroundColor: [
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                    ],
                    hoverBackgroundColor: [
                        'rgba(255, 159, 64, 1)',
                        'rgba(75, 192, 192, 1)',
                        
                    ],
                    borderWidth:2
                }]
            },
            options: {
                maintainAspectRatio: false,
                legend: {
                    display: true,
                        position: 'bottom',
                        },
            }
 
        });


        this.doughnutChart2EM = new Chart(this.doughnutCanvas2EM.nativeElement, {
 
            type: 'doughnut',
            data: {
                labels: ["858 received", "ACK Sent"],
                datasets: [{
                    label: '# of Votes',
                    data: this.values_from_db._mm_xfer[9],
                    backgroundColor: [
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                    ],
                    hoverBackgroundColor: [
                        'rgba(153, 102, 255, 1)',
                        'rgba(75, 192, 192, 1)',
                        
                    ],
                    borderWidth:2
                }]
            },
            options: {
                maintainAspectRatio: false,
                legend: {
                    display: true,
                        position: 'bottom',
                        },
            }
 
        });


        this.doughnutChartMM = new Chart(this.doughnutCanvasMM.nativeElement, {
 
            type: 'doughnut',
            data: {
                labels: ["943 received", "ACK Sent"],
                datasets: [{
                    label: '# of Votes',
                    data: this.values_from_db._mm_xfer[10],
                    backgroundColor: [
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                    ],
                    hoverBackgroundColor: [
                        'rgba(255, 159, 64, 1)',
                        'rgba(75, 192, 192, 1)',
                        
                    ],
                    borderWidth:2
                }]
            },
            options: {
                maintainAspectRatio: false,
                legend: {
                    display: true,
                        position: 'bottom',
                        },
            }
 
        });


        this.doughnutChart2MM = new Chart(this.doughnutCanvas2MM.nativeElement, {
 
            type: 'doughnut',
            data: {
                labels: ["858 received", "ACK Sent"],
                datasets: [{
                    label: '# of Votes',
                    data: this.values_from_db._mm_xfer[11],
                    backgroundColor: [
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                    ],
                    hoverBackgroundColor: [
                        'rgba(153, 102, 255, 1)',
                        'rgba(75, 192, 192, 1)',
                        
                    ],
                    borderWidth:2
                }]
            },
            options: {
                maintainAspectRatio: false,
                legend: {
                    display: true,
                        position: 'bottom',
                        },
            }
 
        });


        this.barChartAgiletoGlovia = new Chart(this.barCanvasAgileToGlovia.nativeElement, {
            type: 'bar',
            data: {
                labels: this.resultSet,
                datasets: [{
                    label: 'Total Count',
                    data: this.values_from_db[0],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(255, 99, 132, 0.2)',
                        // 'rgba(153, 102, 255, 0.2)',
                        // 'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255,99,132,1)',
                        'rgba(255,99,132,1)',
                        'rgba(255,99,132,1)',
                        'rgba(255,99,132,1)',
                        'rgba(255,99,132,1)',
                        'rgba(255,99,132,1)',
                        // 'rgba(153, 102, 255, 1)',
                        // 'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 2
                },
                {
                    label: 'Success Count',
                    data: this.values_from_db[1],
                    backgroundColor: [
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        // 'rgba(153, 102, 255, 0.2)',
                        // 'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(54, 162, 235, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(54, 162, 235, 1)',
                        // 'rgba(153, 102, 255, 1)',
                        // 'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 2
                },{
                    label: 'Failed Count',
                    data: this.values_from_db[2],
                    backgroundColor: [
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        // 'rgba(153, 102, 255, 0.2)',
                        // 'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 206, 86, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(255, 206, 86, 1)',
                        // 'rgba(153, 102, 255, 1)',
                        // 'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 2
                }]
            },
            options: {
                legend: {
                    maintainAspectRatio: false,
                    display: true,
                        position: 'bottom',
                            labels: {

                            }
                        },
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero:true
                        }
                    }],
                    xAxes: [{
                        ticks: {
                            autoSkip: false,
                            beginAtZero:true
                        }
                    }]
                }
            }
 
        });

        this.barChartGPExtract = new Chart(this.barCanvasGPExtract.nativeElement, {
            type: 'bar',
            data: {
                labels: this.resultSet,
                datasets: [{
                    label: 'GP Extract Process Started',
                    data: this.values_from_db._gp_extract[0],
                    backgroundColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(255, 99, 132, 1)',
                        'rgba(255, 99, 132, 1)',
                        'rgba(255, 99, 132, 1)',
                        'rgba(255, 99, 132, 1)',
                        'rgba(255, 99, 132, 1)',
                        // 'rgba(153, 102, 255, 0.2)',
                        // 'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255,99,132,1)',
                        'rgba(255,99,132,1)',
                        'rgba(255,99,132,1)',
                        'rgba(255,99,132,1)',
                        'rgba(255,99,132,1)',
                        'rgba(255,99,132,1)',
                        // 'rgba(153, 102, 255, 1)',
                        // 'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                },
                {
                    label: 'GP Extract Process Ended',
                    data: this.values_from_db._gp_extract[1],
                    backgroundColor: [
                        'rgba(54, 162, 235, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(54, 162, 235, 1)',
                        // 'rgba(153, 102, 255, 0.2)',
                        // 'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(54, 162, 235, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(54, 162, 235, 1)',
                        // 'rgba(153, 102, 255, 1)',
                        // 'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                legend: {
                    maintainAspectRatio: false,
                    display: true,
                        position: 'bottom',
                            labels: {

                            }
                        },
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero:true
                        }
                    }],
                    xAxes: [{
                        ticks: {
                            autoSkip: false,
                            beginAtZero:true
                        }
                    }]
                }
            }
 
        });
    
        this.barChartRelief = new Chart(this.barCanvasRelief.nativeElement, {
            type: 'horizontalBar',
            data: {
                labels: this.resultSet,
                datasets: [{
                    label: 'RELIEF',
                    data: this.values_from_db._relief[0],
                    backgroundColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(255, 99, 132, 1)',
                        'rgba(255, 99, 132, 1)',
                        'rgba(255, 99, 132, 1)',
                        'rgba(255, 99, 132, 1)',
                        'rgba(255, 99, 132, 1)',
                        // 'rgba(153, 102, 255, 0.2)',
                        // 'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255,99,132,1)',
                        'rgba(255,99,132,1)',
                        'rgba(255,99,132,1)',
                        'rgba(255,99,132,1)',
                        'rgba(255,99,132,1)',
                        'rgba(255,99,132,1)',
                        // 'rgba(153, 102, 255, 1)',
                        // 'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                },
                {
                    label: 'STAGED',
                    data: this.values_from_db._relief[1],
                    backgroundColor: [
                        'rgba(54, 162, 235, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(54, 162, 235, 1)',
                        // 'rgba(153, 102, 255, 0.2)',
                        // 'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(54, 162, 235, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(54, 162, 235, 1)',
                        // 'rgba(153, 102, 255, 1)',
                        // 'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                },{
                    label: 'ACK',
                    data: this.values_from_db._relief[2],
                    backgroundColor: [
                        'rgba(255, 206, 86, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(255, 206, 86, 1)',
                        // 'rgba(153, 102, 255, 0.2)',
                        // 'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 206, 86, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(255, 206, 86, 1)',
                        // 'rgba(153, 102, 255, 1)',
                        // 'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                },{
                    label: 'SUMMARIZATION SUCCESSFUL',
                    data: this.values_from_db._relief[3],
                    backgroundColor: [
                        'rgba(75, 192, 192, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(75, 192, 192, 1)',
                        // 'rgba(153, 102, 255, 0.2)',
                        // 'rgba(255, 159, 64, 0.2)'
                        // 'rgba(153, 102, 255, 0.2)',
                        // 'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(75, 192, 192, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(75, 192, 192, 1)',
                        // 'rgba(153, 102, 255, 1)',
                        // 'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                },{
                    label: 'VALIDATION SUCCESSFUL',
                    data: this.values_from_db._relief[4],
                    backgroundColor: [
                        'rgba(153, 102, 255, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(153, 102, 255, 1)',
                        // 'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(153, 102, 255, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(153, 102, 255, 1)',
                        // 'rgba(153, 102, 255, 1)',
                        // 'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                },{
                    label: 'PRE_STAGED',
                    data: this.values_from_db._relief[5],
                    backgroundColor: [
                        'rgba(255, 159, 64, 1)',
                        'rgba(255, 159, 64, 1)',
                        'rgba(255, 159, 64, 1)',
                        'rgba(255, 159, 64, 1)',
                        'rgba(255, 159, 64, 1)',
                        'rgba(255, 159, 64, 1)',
                        // 'rgba(153, 102, 255, 0.2)',
                        // 'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 159, 64, 1)',
                        'rgba(255, 159, 64, 1)',
                        'rgba(255, 159, 64, 1)',
                        'rgba(255, 159, 64, 1)',
                        'rgba(255, 159, 64, 1)',
                        'rgba(255, 159, 64, 1)',
                        // 'rgba(153, 102, 255, 1)',
                        // 'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                legend: {
                    maintainAspectRatio: false,
                    display: true,
                        position: 'bottom',
                            labels: {

                            }
                        },
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero:true
                        }
                    }],
                    xAxes: [{
                        ticks: {
                            autoSkip: false
                        }
                    }]
                }
            }
 
        });

        // this.doughnutChart = new Chart(this.doughnutCanvas3.nativeElement, {
 
        //     type: 'doughnut',
        //     data: {
        //         labels: ["943 received", "ACK Sent"],
        //         datasets: [{
        //             label: '# of Votes',
        //             data: [12, 19],
        //             backgroundColor: [
        //                 'rgba(255, 159, 64, 0.2)',
        //                 'rgba(75, 192, 192, 0.2)',
        //             ],
        //             hoverBackgroundColor: [
        //                 'rgba(255, 159, 64, 1)',
        //                 'rgba(75, 192, 192, 1)',
                        
        //             ]
        //         }]
        //     },
        //     options: {
        //         legend: {
        //             display: false
        //                 },
        //     }
 
        // });
 
        // this.lineChart = new Chart(this.lineCanvas.nativeElement, {
 
        //     type: 'line',
        //     data: {
        //         labels: ["January", "February", "March", "April", "May", "June", "July"],
        //         datasets: [
        //             {
        //                 label: "My First dataset",
        //                 fill: false,
        //                 lineTension: 0.1,
        //                 backgroundColor: "rgba(75,192,192,0.4)",
        //                 borderColor: "rgba(75,192,192,1)",
        //                 borderCapStyle: 'butt',
        //                 borderDash: [],
        //                 borderDashOffset: 0.0,
        //                 borderJoinStyle: 'miter',
        //                 pointBorderColor: "rgba(75,192,192,1)",
        //                 pointBackgroundColor: "#fff",
        //                 pointBorderWidth: 1,
        //                 pointHoverRadius: 5,
        //                 pointHoverBackgroundColor: "rgba(75,192,192,1)",
        //                 pointHoverBorderColor: "rgba(220,220,220,1)",
        //                 pointHoverBorderWidth: 2,
        //                 pointRadius: 1,
        //                 pointHitRadius: 10,
        //                 data: [65, 59, 80, 81, 56, 55, 40],
        //                 spanGaps: false,
        //             }
        //         ]
        //     }
 
        // });

}

}