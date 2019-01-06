import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { EChartOption } from 'echarts';
import { DataService } from '../shared/services/data.service';


@Component({
	selector: 'app-charts',
	templateUrl: './charts.component.html',
	styleUrls: ['./charts.component.scss']
})
export class ChartsComponent implements OnInit {

	options;

	optionsBar;

	degreeOptions;
	degreeTypeOptions;
	cityOptions;
	stateOptions;


	mergeOption: any;
	loading = false;

	graphOption: Observable<EChartOption>;

	constructor(private _dataService:DataService) { }

	ngOnInit() {
		this.getCitychart();
		this.getGenderChart();
		this.getCountryChart();
		this.getDegreeChart();
	}

	getCountryChart(){
		let stateData = this._dataService.GetStateWiseData();
		this.stateOptions  = this.getBarChart( stateData , 'From which State they are ?'  );
	}

	getDegreeChart(){
		let degreeData = this._dataService.GetDegree();
		let mappedDegree = this.getMappingForPie( degreeData ).sort( ( a ,b ) => {return a.value > b.value ? 1 :-1 } );
		
		
		let bachelorsCount = 0 , mastersCount = 0 , naCount = 0 ;
		let bachelorsDegree = mappedDegree.filter(  ( degree) => {  
			if ( degree.name[0].toLowerCase() == 'b'){
					bachelorsCount += degree.value; 
					return true ;
			}else return false ;
		});
		let mastersDegree = mappedDegree.filter(  ( degree) => {  
			if ( degree.name[0].toLowerCase() == 'm'){
					mastersCount += degree.value; 
					return true ;
			}else if (degree.name[0].toLowerCase() == 'n'){ 
					naCount += degree.value; 
					return false;
			}else 
					return false ;
		});
		let data = [ 
			{name : 'Bachelors Degree' , value :bachelorsCount },
			{name: 'Masters Degree' , value : mastersCount},
			{name: 'NA' , value : naCount }
		];
		this.degreeOptions = this.getBarChart( degreeData , 'Which degree do they have ?' ) ;
		this.degreeTypeOptions = this.getPieChart( data , 'Ratio of Masters and Bachelors degree' ) ;
	}

	
	/**
	 * It converts the given object to { name  : <> , value : <>} format
	 * @param data object to be mapped from
	 */
	getMappingForPie(data:Object){
		let mapped = [];
		Object.keys( data ).forEach( (key) => {
			console.log(key);
			mapped.push( { name : key.toUpperCase() , value : data[key]  } );
		} );
		return mapped;

	}
	getGenderChart(){
		let genderData:Object = this._dataService.GetMaleFemaleData();
		let mappedGender:Array<any> = this.getMappingForPie(genderData);
		this.options = {
			backgroundColor: '#2c343c',
	
			title: {
				text: 'Male and Females in this Cohort',
				left: 'center',
				top: 20,
				textStyle: {
					color: '#ccc'
				}
			},
	
			tooltip: {
				trigger: 'item',
				formatter: '{a} <br/>{b} : {c} ({d}%)'
			},
	
			visualMap: {
				show: false,
				min: -10,
				max: 250,
				inRange: {
					colorLightness: [0.2, 1]
				}
			},
			series: [
				{
					name: 'Gender',
					type: 'pie',
					radius: '55%',
					center: ['50%', '50%'],
					data: mappedGender,
					roseType: 'radius',
					label: {
						normal: {
							textStyle: {
								color: 'rgba(255, 255, 255, 0.3)'
							}
						}
					},
					labelLine: {
						normal: {
							lineStyle: {
								color: 'rgba(255, 255, 255, 0.3)'
							},
							smooth: 0.2,
							length: 10,
							length2: 20
						}
					},
					itemStyle: {
						normal: {
							color: '#673ab7',
							shadowBlur: 50,
							shadowColor: 'rgba(0, 0, 0, 0.5)'
						}
					},
	
					animationType: 'scale',
					animationEasing: 'elasticOut',
					animationDelay: function (idx) {
						return Math.random() * 200;
					}
				}
			]
		};
	}

	getCitychart(){
		let cityData  = this._dataService.GetCityWiseData();
		this.cityOptions = this.getBarChart( cityData , "In which cities do they live?" );
	}

	/**
	 * Creates a Bar Chart
	 * @param data the data for which the graph has to be plotted
	 * @param title Title for the article
	 */
	getBarChart(data , title='Bar Chart' ) {

		return {
			color: ['#3398DB'],
			title: {
				text: title,
				left: 'center',
				top: 20,
				textStyle: {
					color: '#111',
					fontSize:24
				}
			},
			tooltip: {
				trigger: 'axis',
				axisPointer: {            
					type: 'shadow'        
				}
			},
			grid: {
				left: '3%',
				right: '4%',
				bottom: '3%',
				containLabel: true
			},
			xAxis: [
				{
					axisLabel : {
						interval : 0
					},
					
					display :true,
					ticks: {
						fontSize: 10
					},
					type: 'category',
					data: Object.keys(data) ,
					// axisTick: {
					// 	alignWithLabel: true
					// }
				}
			],
			yAxis: [
				{
					
					type: 'value'
				}
			],
			series: [
				{
					name: 'Number',
					type: 'bar',
					barWidth: '40%',
					data: Object.values(data),
					itemStyle: {
						normal: {
							color: '#673ab7',
							shadowBlur: 5,
							shadowColor: 'rgba(0, 0, 0, 0.5)'
						}
					},
					animationType: 'scale',
					animationEasing: 'elasticOut',
					animationDelay: function (idx) {
						return Math.random() * 200;
					}
				},
				
			],
			

			
		};

	}

	/**
	 * Creates A Pie chart for our data
	 * @param data the data for which the graph has to be plotted
	 * @param title The title of the chart
	 */
	getPieChart( data , title ){
		return  {
			backgroundColor: '#2c343c',
	
			title: {
				text: title,
				left: 'center',
				top: 20,
				textStyle: {
					color: '#ccc'
				}
			},
	
			tooltip: {
				trigger: 'item',
				formatter: '{a} <br/>{b} : {c} ({d}%)'
			},
	
			visualMap: {
				show: false,
				min: -10,
				max: 250,
				inRange: {
					colorLightness: [0.2, 1]
				}
			},
			series: [
				{
					name: 'Gender',
					type: 'pie',
					radius: '55%',
					center: ['50%', '50%'],
					data: data,
					roseType: 'radius',
					label: {
						normal: {
							textStyle: {
								color: 'rgba(255, 255, 255, 0.3)'
							}
						}
					},
					labelLine: {
						normal: {
							lineStyle: {
								color: 'rgba(255, 255, 255, 0.3)'
							},
							smooth: 0.2,
							length: 10,
							length2: 20
						}
					},
					itemStyle: {
						normal: {
							color: '#673ab7',
							shadowBlur: 200,
							shadowColor: 'rgba(0, 0, 0, 0.5)'
						}
					},
	
					animationType: 'scale',
					animationEasing: 'elasticOut',
					animationDelay: function (idx) {
						return Math.random() * 200;
					}
				}
			]
		};
	}

	

}
