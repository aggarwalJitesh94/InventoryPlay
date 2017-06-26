import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { scanSVCService } from '../../app/services/scanSVC.service';

@Component({
  selector: 'page-SVCResult',
  templateUrl: 'SVCResult.html',
  providers: [scanSVCService]
})
export class SVCResultPage {

  resultASN: any;
  public keys: any;
  loading: any;
  public service_tag: any;
  public item_name: any;
  public location: any;
  public region: any;

  constructor(private toastCtrl: ToastController, public loadingCtrl: LoadingController, public navParams: NavParams, public navCtrl: NavController, private SVCService: scanSVCService) {
        this.loading = this.loadingCtrl.create({
            content: 'Fetching ASN Data. Please wait...',
            spinner: 'bubbles'
            });
        
      this.loading.present();
      this.location = navParams.get("location");
      this.service_tag = navParams.get("service_tag");
      this.item_name = navParams.get("item_name");
      this.region = navParams.get("region");

    try{
    this.SVCService.getSVCData(this.service_tag).subscribe(response => {
      this.resultASN = response;
      this.loading.dismiss(); 
      if(this.resultASN.length == 0){
        this.present_toast("No Data found for the given record. Try again.");
        this.navCtrl.pop();
      }else{
        console.log(this.resultASN);
      }
      },
      error => {
                this.loading.dismiss();
                this.present_toast("Error Occured while fetching data. Please try again.");
                this.navCtrl.pop();

        }
      ); 
  }catch(Exception){
              this.loading.dismiss();
              this.present_toast("Internal Error Occured. Please try again.");
              this.navCtrl.pop();

  }
  }


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

  ngOnInit(){
    
  }

}
