import React, {Component} from 'react';

class WeatherTab extends Component{

    getIconPath(imgName){
        return "http://openweathermap.org/img/wn/"+ imgName +"@2x.png";
    }

    render(){
        return (
            <div className='weather-tab'>
                <div><h3>{this.props.nameOfDay}</h3></div>
                <div><img src={this.getIconPath(this.props.dayData.weather[0].icon)} alt={this.props.dayData.weather[0].description}/></div>
                <div>{this.props.dayData.weather[0].main}</div>
                <div>
                    <div className='temps'>high <div>{Math.trunc(this.props.dayData.temp.max)}</div></div>
                    <div className='temps'>low <div>{Math.trunc(this.props.dayData.temp.min)}</div></div>
                </div>
            </div>
        );
    }
}

export default WeatherTab;