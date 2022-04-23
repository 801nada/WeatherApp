import React, {Component} from 'react';
import axios from 'axios';
import WeatherTab from './WeatherTab';
import {dataService} from './WeatherSubject';

const days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
const apiSettings = {
    
    baseApiUrl: "https://api.openweathermap.org/data/2.5/onecall?units=imperial&exclude=current,minutely,hourly,alerts&",
    apiKey:"0b3280130b6e9321dccd50cd51bb1be4"
};

class WeatherRow extends Component{ 
    constructor(props){
        super(props);
        this.state = {
            cityName: "",
            weatherData: undefined
        };
    }

    componentDidMount()
    {
        dataService.getData().subscribe(data => {
            if(data){        
                this.GetWeatherData(data.value);            
            } else {
                this.setState({cityName: "", weatherData: undefined})
            } 
        });
        
    }
 
    renderTabs(){
        if(this.state === null || this.state.weatherData === undefined){
            return <div></div>; 
        }
        var rows = [];  
        this.state.weatherData.daily.map((data, index) => rows.push(<WeatherTab key={index} nameOfDay={this.getDayName(index)} dayData={data}/>));
        return rows;              
    }

    GetWeatherData(data){
        var fullUrl = apiSettings.baseApiUrl+"appid="+apiSettings.apiKey+"&lat="+data.coord.lat+"&lon="+data.coord.lon;
        axios.get(fullUrl)
            .then(
                (response) => {
                    this.setState({cityName: data.name, weatherData: response.data});
                });
    }
    
    getDayName(viewDay){
        if(viewDay === 0) return "Today";
        var day = new Date();
        day.setDate(day.getDate() + viewDay);
        return days[day.getDay()];
    }

    render(){
        return(
            <div className='main-weather'>
                {this.renderTabs()}                                     
            </div>
        );
    }
}

export default WeatherRow;