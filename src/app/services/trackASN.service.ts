import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class trackASNService{
	http: any;
	baseUrl: string;
	baseUrlDetail: string;
	baseUrlError: string;
	result: any;
	resultDetail: any;

	constructor(http: Http){
		this.http = http,
		this.baseUrl = 'http://c15b6841.ngrok.io/AsnId?';
		this.baseUrlDetail = 'http://c15b6841.ngrok.io/AsnDetails?';
		this.baseUrlError = 'http://c15b6841.ngrok.io/Error?';

	}

	getASNErrorDetail(asn_id,senderApp, trans_type, sub_tran_name){
		sub_tran_name = sub_tran_name.split(' ').join('%20');
		console.log(this.baseUrlError+"asn_id="+asn_id+"&app_name="+senderApp+"&sub_tran_name="+sub_tran_name+"&trans_type="+trans_type);
		this.result = this.http.get(this.baseUrlError+"asn_id="+asn_id+"&app_name="+senderApp+"&sub_tran_name="+sub_tran_name+"&trans_type="+trans_type)
		.map(res => res.json());
		return this.result;
	}

	getASNData(asn_id, svc_tag, trans_type){
			this.result = this.http.get(this.baseUrl+"asn_id="+asn_id+"&svc_tag="+svc_tag+"&trans_type="+trans_type)
		.map(res => res.json());
		return this.result;

		 
	}

	getASNDetail(asn_id,senderApp, trans_type){
			this.resultDetail = this.http.get(this.baseUrlDetail+"asn_id="+asn_id+"&sender_app_name="+senderApp+"&trans_type="+trans_type)
		.map(res => res.json());
		return this.resultDetail;	
		 
	}

	

	getResult(){
		return this.result;
	}

}

