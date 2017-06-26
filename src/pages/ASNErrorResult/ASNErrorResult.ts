import { Component } from '@angular/core';
import { NavController,NavParams, LoadingController, ToastController } from 'ionic-angular';
import { trackASNPage } from '../trackASN/trackASN';
import { trackASNService } from '../../app/services/trackASN.service';  


@Component({
  selector: 'page-ASNErrorResult',
  templateUrl: 'ASNErrorResult.html',
    providers: [trackASNService]

})
export class ASNErrorResultPage {

  resultASN: any;
  ASNResult = { date_Time: "",
  sub_Tran_Name: "",
  error_Msg: "",
  msg_Type: "",
  service_Tag: "",
  record_Status: "",
  };
  loading: any;
  public search: any;
  public trans_type: any;
  public senderApp: any;
  public sub_Tran_Name: any;

  constructor(private ASNService: trackASNService, private toastCtrl: ToastController,public loadingCtrl: LoadingController, public navParams: NavParams,public navCtrl: NavController) {
    this.loading = this.loadingCtrl.create({
            content: 'Fetching ASN Data. Please wait...',
            spinner: 'bubbles'
            });

      this.loading.present();
      this.search = navParams.get("search");
      this.trans_type = navParams.get("trans_type");
      this.senderApp = navParams.get("senderApp");
      this.sub_Tran_Name = navParams.get("sub_Tran_Name");
      
     try{
      console.log(this.search);
      console.log(this.trans_type);
      console.log(this.senderApp);
      console.log(this.sub_Tran_Name);
      this.ASNService.getASNErrorDetail(this.search, this.senderApp, this.trans_type, this.sub_Tran_Name).subscribe(response => {
      this.resultASN = response;
      this.loading.dismiss();
      console.log(this.resultASN);
      
      if(this.resultASN.length == 0){
        this.present_toast("No Data found for the given record. Try again.");
        this.navCtrl.pop();
      }else
      {
        this.ASNResult = Object.assign({}, this.resultASN[0]);
        console.log(this.resultASN);
      } 
      },
      error => {
                this.loading.dismiss();
                this.present_toast("Error Occured while fetching data. Please try again.");
                this.navCtrl.pop();
        }
      ); 
      }catch(exception){
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

  backToTrackASN(){
    this.navCtrl.popToRoot();
  }
}