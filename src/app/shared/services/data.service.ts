import { Injectable } from '@angular/core';
import { json as Data}   from "../data/csvjson.json";

@Injectable({
	providedIn: 'root'
})
export class DataService {

	private data: Array<any>;
	constructor() {
		this.data = Data;
	}

	GetMaleFemaleData() {
		return this.groupBy(this.data, 'Gender');
	}

	GetStateWiseData() {

		return this.groupBy(this.data, 'State');

	}

	GetCityWiseData() {
		return this.groupBy(this.data, 'City');
	}

	GetProfessions() {
		return this.groupBy(this.data, 'Job Role');
	}

	GetExperience() {
		let experiences = this.data.map( (item) => parseInt(item.Experience) );
		let uptoFourCount= 0, upto9 = 0, above9 = 0;
		experiences.forEach( (exp) => {
			if ( exp >=0 && exp<=4){
				uptoFourCount += 1;
			}else if ( exp >4 && exp<=9 ){
				upto9 += 1;
			}else if (exp>=10) {
				above9 += 1
			}
		} );

		return {
			"0-4 Years" : uptoFourCount,
			"5-9 Years" : upto9,
			"10 and above Years" : above9
		}

	}

	GetDegree(){
		return this.groupBy(this.data , 'Degree');
	}

	groupBy(item, key) {

		let groupedData = {};
		console.log( this.data);
		this.data.forEach((item) => {

			if (groupedData[item[key]]) {
				groupedData[item[key]] += 1;
			} else {
				groupedData[item[key]] = 1;
			}
		});

		return groupedData;
	}

}
