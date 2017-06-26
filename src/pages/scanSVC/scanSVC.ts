import { Component } from '@angular/core';
import { NavController, ActionSheetController,AlertController, PopoverController } from 'ionic-angular';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner';
import { scanSVCService } from '../../app/services/scanSVC.service';
import { SVCResultPage } from '../SVCResult/SVCResult';
import { PopoverPage } from '../my-pop-over';


@Component({
  selector: 'page-scanSVC',
  templateUrl: 'scanSVC.html',
  providers: [scanSVCService]
})


export class scanSVCPage {

   options: BarcodeScannerOptions;     
   public region;
   public service_tag;
   public item_name;
   public location;
   public screenSelect;

   results: any;

  constructor(public popoverCtrl: PopoverController,private alertCtrl: AlertController, private SVCService: scanSVCService, public actionSheetCtrl: ActionSheetController, public navCtrl: NavController, private barcodeScanner: BarcodeScanner) {
    this.screenSelect = "by_svc_tag";
  }


  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopoverPage);
    popover.present({
      ev: myEvent
    });
  }

  try_svc_tag(){

  }

  try_item_name(){

  }

  try_location(){
  }

  async scanBarCode(){

  	 this.options = {
  	 	prompt: 'Scan a barcode to see the results'
  	 }

  	 this.results = await this.barcodeScanner.scan(this.options);
     this.service_tag = this.results.text;
    }

  ngOnInit(){
    //this.region = "Tap to select a Region"; 
  }

  presentActionSheet() {
   let actionSheet = this.actionSheetCtrl.create({
     title: 'Select a Region',
     cssClass: 'action-sheets-basic-page',
     buttons: [
       {
        text: 'DAO',
        handler:()=>{
        this.region = "DAO";
        }
       },
       {
        text: 'APJ',
        handler:()=>{
        this.region = "APJ";
        }
       },
       {
        text: 'EMEA',
        handler:()=>{
        this.region = "EMEA";
        }
       },
       {
        text: 'Dismiss',
        role: 'cancel'
       }
     ]
   });

   actionSheet.present();
 }

 SVCResult(){

  if(this.region==null){
        this.presentAlert("Missing Value!","Please select a Region to Proceed");
      }
      else if((this.service_tag==null||this.service_tag.length<7)&&this.screenSelect=="by_svc_tag"){
        this.presentAlert("Missing Value!","Scan or enter a service tag to Proceed.");
      }
      else if((this.item_name==null||this.item_name.length<4)&&this.screenSelect=="by_item_name"){
        this.presentAlert("Missing Value!","Enter item name to Proceed.");
      }
      else if((this.location==null||this.location.length<4)&&this.screenSelect=="by_location"){
        this.presentAlert("Missing Value!","Enter location to Proceed.");
      }
      else{
    console.log(this.service_tag + " " + this.item_name + " " + this.location + " " + this.region );
      this.navCtrl.push(SVCResultPage, {
        service_tag:this.service_tag,
        region: this.region,
        item_name:this.item_name,
        location:this.location
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

}
