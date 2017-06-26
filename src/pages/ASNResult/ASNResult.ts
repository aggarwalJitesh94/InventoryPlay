import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { ASNDetailResultPage } from '../ASNDetailResult/ASNDetailResult';
import { trackASNService } from '../../app/services/trackASN.service';  

@Component({
  selector: 'page-ASNResult',
  templateUrl: 'ASNResult.html',
  providers: [trackASNService]
})
export class ASNResultPage {

  resultASN: any;
  ASNResult = { region: "",
  asn_Received_On: "",
  sender_App_Name: "",
  msg_Type: "",
  trans_Flag: "",
  tansactionId: "",
  };
  keys: any;
  loading: any;
  public asn_id: any;
  public trans_type: any;
  public svc_tag: any;
  public search: any;

  constructor(private toastCtrl: ToastController,public loadingCtrl: LoadingController, public navParams: NavParams, public navCtrl: NavController, private ASNService: trackASNService) {
      
      this.loading = this.loadingCtrl.create({
            content: 'Fetching ASN Data. Please wait...',
            spinner: 'bubbles'
            });

      this.loading.present();
      this.asn_id = navParams.get("asn_id");
      this.trans_type = navParams.get("trans_type");
      this.svc_tag = navParams.get("svc_tag");

      this.search= this.asn_id;
      
      if(this.asn_id==null || this.asn_id.length<2){
          this.search=this.svc_tag;
      }
     
     try{
      console.log(this.asn_id);
      console.log(this.search);
      this.ASNService.getASNData(this.asn_id, this.svc_tag, this.trans_type).subscribe(response => {
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

  boss(){
    console.log("boss");
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

  fetch_details(senderApp){
    console.log(senderApp);
  	
    this.navCtrl.push(ASNDetailResultPage,{
                                            search:this.search,
                                            trans_type:this.trans_type,
                                            senderApp:senderApp,
                                          })
  }

}
