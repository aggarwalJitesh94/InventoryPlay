import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { ASNErrorResultPage } from '../ASNErrorResult/ASNErrorResult';
import { trackASNService } from '../../app/services/trackASN.service';  



@Component({
  selector: 'page-ASNDetailResult',
  templateUrl: 'ASNDetailResult.html',
  providers: [trackASNService]
})
export class ASNDetailResultPage {


  resultASN: any;
  ASNResult = { date_Time: "",
  sub_Tran_Name: "",
  error_Msg: "",
  msg_Type: "",
  };
  loading: any;
  public search: any;
  public trans_type: any;
  public senderApp: any;

  constructor(private toastCtrl: ToastController,public loadingCtrl: LoadingController, public navParams: NavParams, public navCtrl: NavController, private ASNService: trackASNService) {
    this.loading = this.loadingCtrl.create({
            content: 'Fetching ASN Data. Please wait...',
            spinner: 'bubbles'
            });

      this.loading.present();
      this.search = navParams.get("search");
      this.trans_type = navParams.get("trans_type");
      this.senderApp = navParams.get("senderApp");
      
     try{
      console.log(this.search);
      console.log(this.trans_type);
      console.log(this.senderApp);
      this.ASNService.getASNDetail(this.search, this.senderApp, this.trans_type).subscribe(response => {
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

  ngOnInit(){
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

  showErrorResult(sub_Tran_Name){
    console.log(sub_Tran_Name);
    console.log(this.search);
    console.log(this.trans_type);
    console.log(this.senderApp);
  	this.navCtrl.push(ASNErrorResultPage,{
      sub_Tran_Name: sub_Tran_Name,
      search: this.search,
      trans_type:this.trans_type,
      senderApp:this.senderApp,
    });
  }
}
