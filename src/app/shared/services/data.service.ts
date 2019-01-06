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
		return this.groupBy(this.data, 'Experience');
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
