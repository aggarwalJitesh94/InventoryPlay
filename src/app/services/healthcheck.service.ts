import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class healthCheckService{

	http: any;
	baseUrl: string;
	labels: {};
	values_week: any;
	values_day: any;

	// public values_week:  { asn_values_day: any,
	// 				  	  mm_xfer: any, 
	// 				  	  gp_extract: any,
	// 				  	  relief_value: any,
	// 					};

	// public values_day:  { asn_values_day: any,
	// 				  	  mm_xfer: any, 
	// 				  	  gp_extract: any,
	// 				  	  relief_value: any,
	// 					};



	constructor(http: Http){

		this.http = http,
		//this.baseUrl = 'http://192.168.1.9:8080/SvcTag';
		this.baseUrl = 'http://c15b6841.ngrok.io/HealthCheck?time=';

		this.labels = ["APCC", "BRH", "DAO", "CCC", "EMEA", "DGPC"];

		this.values_week = {
		_relief : [[7,7,7,7,7,7],[13,13,13,13,13,13],[9,9,9,9,9,9],[50,50,50,50,50,50],[10,10,10,10,10,10],[16,16,16,16,16,16]],
		_gp_extract : [[40,40,40,40,40,40],[15,15,15,15,15,15]],
		_mm_xfer : [[19,12],[19,12],[19,12],[19,12],[19,12],[19,12],[19,12],[19,12],[19,12],[19,12],[19,12],[19,12]],
		_asn_values_day : [[7,7,7,7,7,7],[13,13,13,13,13,13],[9,9,9,9,9,9],[50,50,50,50,50,50],[10,10,10,10,10,10],[16,16,16,16,16,16]],
		}

		this.values_day = {
		_relief : [[7,7,7,7,7,7],[13,13,13,13,13,13],[9,9,9,9,9,9],[50,50,50,50,50,50],[10,10,10,10,10,10],[16,16,16,16,16,16]],
		_gp_extract : [[40,40,40,40,40,40],[15,15,15,15,15,15]],
		_mm_xfer : [[19,12],[19,12],[19,12],[19,12],[19,12],[19,12],[19,12],[19,12],[19,12],[19,12],[19,12],[19,12]],
		_asn_values_day : [[7,7,7,7,7,7],[13,13,13,13,13,13],[9,9,9,9,9,9],[50,50,50,50,50,50],[10,10,10,10,10,10],[16,16,16,16,16,16]],
		}

		// this.values_week = {};
		// this.values_week.relief_value = [[7,7,7,7,7,7],[13,13,13,13,13,13],[9,9,9,9,9,9],[50,50,50,50,50,50],[10,10,10,10,10,10],[16,16,16,16,16,16]];
		// this.values_week.gp_extract = [[40,40,40,40,40,40],[15,15,15,15,15,15]];
		// this.values_week.mm_xfer = [[19,12],[19,12],[19,12],[19,12],[19,12],[19,12],[19,12],[19,12],[19,12],[19,12],[19,12],[19,12]];
		// this.values_week.asn_values_day = [[7,7,7,7,7,7],[13,13,13,13,13,13],[9,9,9,9,9,9],[50,50,50,50,50,50],[10,10,10,10,10,10],[16,16,16,16,16,16]];

		// this.values_day = {};
		// this.values_day.relief_value = [[7,7,7,7,7,7],[13,13,13,13,13,13],[9,9,9,9,9,9],[50,50,50,50,50,50],[10,10,10,10,10,10],[16,16,16,16,16,16]];
		// this.values_day.gp_extract = [[20,20,20,20,20,20],[15,15,15,15,15,15]];
		// this.values_day.mm_xfer = [[19,12],[19,12],[19,12],[19,12],[19,12],[19,12],[19,12],[19,12],[19,12],[19,12],[19,12],[19,12]];
		// this.values_day.asn_values_day = [[7,7,7,7,7,7],[13,13,13,13,13,13],[9,9,9,9,9,9],[50,50,50,50,50,50],[10,10,10,10,10,10],[16,16,16,16,16,16]];
	}

	getHCData(time){
		if(time==="week"){
			this.values_day = this.http.get(this.baseUrl+"weekly")
			.map(res => res.json());
			console.log(this.values_day);
			return this.values_day;

		}
		else{
			this.values_week = this.http.get(this.baseUrl+"daily")
			.map(res => res.json());
			console.log(this.values_week);	
			return this.values_week;
		}
		
		
	}


	getHCValues(time){
		if(time==="week")
			return this.values_week;
		else
			return this.values_day;
	}

	getHCLabels(){
		return this.labels;
	}

}

