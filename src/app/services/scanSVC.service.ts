import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class scanSVCService{
	http: any;
	baseUrl: string;
	baseUrlSvc: string;
	baseUrlItem: string;
	baseUrlLoc: string;
	result: any;

	constructor(http: Http){
		this.http = http,
		this.baseUrlSvc = 'http://c15b6841.ngrok.io/SvcTag?';
		this.baseUrlItem = 'http://c15b6841.ngrok.io/Item?';
		this.baseUrlLoc = 'http://c15b6841.ngrok.io/Location?';
	}


	getSVCData(svc_tag){
		 this.result = this.http.get(this.baseUrlSvc+"svc_tag="+svc_tag)
		.map(res => res.json());
		return this.result;
	}


	getItemData(item, ccn){
		 this.result = this.http.get(this.baseUrlItem+"ccn="+ccn+"&item="+item)
		.map(res => res.json());
		return this.result;
	}

	getLocData(location, region){
		 this.result = this.http.get(this.baseUrlLoc+"ccn="+region+"&location="+location)
		.map(res => res.json());
		return this.result;
	}


	getResult(){
		return this.result;
	}

}
