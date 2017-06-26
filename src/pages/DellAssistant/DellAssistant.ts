import { Component, ChangeDetectorRef} from '@angular/core';
import { NavController, Platform, ToastController, PopoverController,ModalController } from 'ionic-angular';
import { SpeechRecognition } from '@ionic-native/speech-recognition';
import {CallNumber } from '@ionic-native/call-number';
import { Contacts, Contact, ContactField, ContactName } from '@ionic-native/contacts';
import { PopoverPage } from '../my-pop-over';
import { ModalPage } from '../modal-page';

@Component({
  selector: 'page-DellAssistant',
  templateUrl: 'DellAssistant.html',
  providers: [CallNumber, Contacts]
})
export class DellAssistantPage {
  matches: String[];
  match: string;
  isRecording: boolean;
  constructor(public modalCtrl: ModalController, public popoverCtrl: PopoverController, private toastCtrl: ToastController,private contacts: Contacts, private callNumber: CallNumber,public navCtrl: NavController, private speechRecognition: SpeechRecognition, private plt: Platform, private changeDirRef: ChangeDetectorRef) {

  }

  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopoverPage);
    popover.present({
      ev: myEvent
    });
  }

  refresh(){
        this.match="";
        this.onInput();
    }

  presentModal(contact_number) {
    let modal = this.modalCtrl.create(ModalPage,{charNum:contact_number});
    modal.present();
  }

  cards = [
  {
    "title": "Cycle Counting",
    "content": "A count of Items, performed to meet the requirements of A-B-C cycles. As an example based on the ABC cycle, Glovia selects a mix of Items (or parts) that have passed A-30, B-60, or C-90 days since their last cycle count date.",
    "contact_name": "Sarath Kalavala",
    "img_name": "assets/img/stock.jpg",
    "contact_number": 9845868097,
    "contact_id": "raj_kumar@dell.com",
    "char_num": 0,
  },
  {
    "title": "On Hand Quantity",
    "content": "The Item quantity that, according to Glovia's inventory records  that should be found upon physical inspection of a Location/Bin",
    "contact_name": "Hithesh B Sekhar",
    "img_name": "assets/img/supply.jpg",
    "contact_number": 9910370731,
    "contact_id": "raj_kumar@dell.com",
    "char_num": 0,
  },
  {
    "title": "Physical Inventory",
    "content": "A 100% count of all item numbers within a location or a master location. Also informally called a \"wall-to-wall\".",
    "contact_name": "Hithesh B Sekhar",
    "img_name": "assets/img/warehouse.jpg",
    "contact_number": 9910370731,
    "contact_id": "raj_kumar@dell.com",
    "char_num": 0,
  },
  {
    "title": "RTV",
    "content": "Defective items may be returned to vendor for credit or replacement.",
    "contact_name": "Hithesh B Sekhar",
    "img_name": "assets/img/tracking.jpg",
    "contact_number": 9910370731,
    "contact_id": "raj_kumar@dell.com",
    "char_num": 0,
  },
  {
    "title": "Vertical Assembly",
    "content": "Vertical Assembly is the creation of a sub assembly that will be used later to manufacture complete systems.",
    "contact_name": "Hithesh B Sekhar",
    "img_name": "assets/img/loading.gif",
    "contact_number": 9910370731,
    "contact_id": "raj_kumar@dell.com",
    "char_num": 0,
  },
  {
    "title": "Pick process",
    "content": "The Pick Process provides for the recording and tracking of inventory movement from location to location within a master location. The Pick Process is one of the most common Glovia functions.",
    "contact_name": "Hithesh B Sekhar",
    "img_name": "assets/img/loading.gif",
    "contact_number": 9910370731,
    "contact_id": "raj_kumar@dell.com",
    "char_num": 0,
  },
  {
    "title": "BINS",
    "content": "Represent the smallest unit of measure within Glovia",
    "contact_name": "Indumathi R",
    "img_name": "assets/img/loading.gif",
    "contact_number": 9632226881,
    "contact_id": "raj_kumar@dell.com",
    "char_num": 1,
  },
  {
    "title": "LOC",
    "content": "Represents a stockroom.  There may be many locations (or stockrooms) within a master location.",
    "contact_name": "Hithesh B Sekhar",
    "img_name": "assets/img/loading.gif",
    "contact_number": 9910370731,
    "contact_id": "raj_kumar@dell.com",
    "char_num": 0,
  },
  {
    "title": "MAS LOC",
    "content": "represents a consolidated grouping of locations.",
    "contact_name": "Hithesh B Sekhar",
    "img_name": "assets/img/loading.gif",
    "contact_number": 9910370731,
    "contact_id": "raj_kumar@dell.com",
    "char_num": 0,
  },
  {
    "title": "Transfer Orders",
    "content": "Facility to Facility movements. Within a Facility, you should use the Pick Process.",
    "contact_name": "Jitesh Aggarwal",
    "img_name": "assets/img/loading.gif",
    "contact_number": 7838701651,
    "contact_id": "raj_kumar@dell.com",
    "char_num": 2,
  },
  {
    "title": "WIP",
    "content": "Work in Progress",
    "contact_name": "Jitesh Aggarwal",
    "img_name": "assets/img/loading.gif",
    "contact_number": 7838701651,
    "contact_id": "raj_kumar@dell.com",
    "char_num": 0,
  },
  {
    "title": "Transapp",
    "content": "Transapp is an interface used by the Services group to communicate inventory transactional records to Glovia from 3rd party applications.",
    "contact_name": "Hithesh B Sekhar",
    "img_name": "assets/img/stock.jpg",
    "contact_number": 9910370731,
    "contact_id": "raj_kumar@dell.com",
    "char_num": 0,
  },
  {
    "title": "Manufacturing Support System",
    "content": "System Is an Asset Recovery Business , known as ARB,  application which manages the remanufacturing of returned syst",
    "contact_name": "Jitesh Aggarwal",
    "img_name": "assets/img/loading.gif",
    "contact_number": 7838701651,
    "contact_id": "raj_kumar@dell.com",
    "char_num": 2,
  },
  {
    "title": "Factory Planner",
    "content": "Factory Planner is used by Dell factories worldwide to generate an optimized production schedule for the factory in order to build the customer orders in a timely fashion, as well as coordinate the supply of materials for the factory.",
    "contact_name": "Hithesh B Sekhar",
    "img_name": "assets/img/loading.gif",
    "contact_number": 9910370731,
    "contact_id": "raj_kumar@dell.com",
    "char_num": 0,
  },
  {
    "title": "Hub Collaboration",
    "content": "The purpose of Hub Collaboration is to affect delivery of the parts needed by the factories to build ordered systems as quickly as possible and to maintain the lowest possible inventory on the factory floor.  Hub Collaboration will display the material requests to factory Material Planners, who will review and make decisions based on data available. \nThe Hub Collaboration module will then facilitate the communication of expected receipts between Dell and its Hub partners.",
    "contact_name": "Hithesh B Sekhar",
    "contact_number": 9910370731,
    "contact_id": "raj_kumar@dell.com",
    "char_num": 0,
  },
  {
    "title": "Supplier Logistic Center",
    "content": "The Supplier Logistic Centers will compare their inventory position to the material requirements generated by Factory Planner and communicate their supportability back to Factory Planner via Hub Collaboration.",
    "contact_name": "Aviral Soni",
    "img_name": "assets/img/loading.gif",
    "contact_number": 9818453041,
    "contact_id": "raj_kumar@dell.com",
    "char_num": 3,
  },
  {
    "title": "Receiving Invoice Discrepancy Tool ,(RICT )",
    "content": "RICT allows for real time collaboration between Dell Receivers, Dell Buyers, and the Supplier Logistics Centers in order to resolve receiving discrepancies in a timely and efficient manner. Discrepancies can be logged manually in the tool or can be received in an automated fashion, via Application to Application, or A2A,  from the Hub Collaboration Dockscan module.",
    "contact_name": "Naveen Kumar",
    "img_name": "assets/img/loading.gif",
    "contact_number": 9620469369,
    "contact_id": "raj_kumar@dell.com",
    "char_num": 4,
  },
  {
    "title": "Picking Material business process",
    "content": "process is made up of several functions\nPick Request the actual request for material\nPick Issue actual delivery of material, and \nPick Receipt  - the physical receipt of material at the point of use",
     "contact_name": "Aviral Soni",
    "img_name": "assets/img/loading.gif",
    "contact_number": 9818453041,
    "contact_id": "raj_kumar@dell.com",
    "char_num": 3,
  },
  {
    "title": "Transfer Order business process",
    "content": "The Transfer Order business process is used when material movement occurs  between facilities.  It also tracks their associated costs\nThis is a four part process.  First the request occurs from the facility that needs the material.  Second, there is a commit from the facility fulfilling the request.  Third, the materials are issued from the facility fulfilling the request. And fourth, the receipt is completed from the requesting facility.",
    "contact_name": "Gopinath Annamalai",
    "img_name": "assets/img/loading.gif",
    "contact_number": 9980562110,
    "contact_id": "raj_kumar@dell.com",
    "char_num": 5,
  },
  {
    "title": "Vertical Assembly",
    "content": "Vertical Assembly is a function which systematically creates assemblies and issues those assemblies to a Glovia location.\nThis is a two part process.  First, the system generates a pick list for all components required to build the assembly. And second, the issue phase decrements the components used for building assembly, increments the assembly being built, and the variations in cost go to a variance account.",
    "contact_name": "Hithesh B Sekhar",
    "img_name": "assets/img/loading.gif",
    "contact_number": 9910370731,
    "contact_id": "raj_kumar@dell.com",
    "char_num": 0,
  },
  {
    "title": "Back flush",
    "content": "Relief of Inventory is known as back flush at Dell.\nThe back flush process includes both Tandem and Glovia. The relief component occurs in Glovia.\nWhen an order is assembled, shipped to the customer, and invoiced to the customer, it is then that parts making up the order must have their quantities reduced. This is known as relief.   The associated costs of these parts are then charged to cost of goods sold.",
     "contact_name": "Aviral Soni",
    "img_name": "assets/img/loading.gif",
    "contact_number": 9818453041,
    "contact_id": "raj_kumar@dell.com",
    "char_num": 3,
  },
  {
    "title": "ITS",
    "content": "ITS stands for the Intercompany Transaction System. It supports the transfer of inventory among Dell company locations\n\nIt supports the buying and selling of inventory across Dell company locations by providing the following functions:\nIntercompany Transfer Pricing\nIntercompany Purchase Orders and Receipts processing\nPosting of Intercompany Financial Transactions\nAudit Trail database",
     "contact_name": "Aviral Soni",
    "img_name": "assets/img/loading.gif",
    "contact_number": 9818453041,
    "contact_id": "raj_kumar@dell.com",
    "char_num": 3,
  }
];


  getPermission(){
  	this.speechRecognition.hasPermission()
    .then((hasPermission: boolean) => {
    	if(!hasPermission){
    		this.speechRecognition.requestPermission()
		 	.then(
		    () => console.log('Granted'),
		    () => console.log('Denied')
		  )
    	}
	})
  }

  startListening(){
  	this.getPermission();
  	let options = {
  		language: 'en-IN'
  	}
		this.speechRecognition.startListening(options).subscribe(matches => {
			this.matches = matches;
      this.match = matches[0];
			this.isRecording = true;
			this.changeDirRef.detectChanges();
      this.onInput();
		});
  	}

  stopListening(){
	this.speechRecognition.stopListening();
  }

  isIos(){
  	return this.plt.is('ios');
  }

  dial_contact(number){
    console.log(number);
    this.callNumber.callNumber(number, false)
  .then(() => console.log('Launched dialer!'))
  .catch(() => console.log('Error launching dialer'));
  }

  add_contact(number,name){
    let contact: Contact = this.contacts.create();

    contact.name = new ContactName(null, name);
    contact.phoneNumbers = [new ContactField('mobile', number)];
    contact.save().then(
      () => {
        console.log('Contact saved!', contact);
        this.present_toast("Contact Saved "+ name);
    },
      (error: any) => {
        console.error('Error saving contact.', error)
        this.present_toast("Error saving contact.");
      }
    );
  }


  present_toast(messageStr){
    let toast = this.toastCtrl.create({
                message: messageStr,
                duration: 5000,
                position: 'bottom'
              });

              toast.onDidDismiss(() => {
                console.log('Dismissed toast');
              });

              toast.present();
  }

  selectedCards = JSON.parse(JSON.stringify(this.cards));
  emptyCard = {
    "title": "",
    "content": "",
    "contact_name": "",
    "contact_number": null ,
    "img_name": "",
    "contact_id": "",
    "char_num": null,
  };

  isCardEmpty=false;

  onInput(){
    var i=0;
    var flag= 0;
    for (let card of this.selectedCards) {
        if(card.contact_name.toUpperCase().includes(this.match.toUpperCase())||card.content.toUpperCase().includes(this.match.toUpperCase())||card.title.toUpperCase().includes(this.match.toUpperCase())){
          this.cards[i++]=card;
          flag=1;
        }
        else{
          this.cards[i++]= Object.assign({}, this.emptyCard);
          //this.selectedCards.splice(i++,1); 
        }
    }
    if(flag==0){
      this.isCardEmpty=true;
    }
    else{
      this.isCardEmpty=false; 
    }
    console.log(this.selectedCards);
  }
}
