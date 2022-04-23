import React, {Component} from 'react';
import cityList from '../city.list.partial_PE_US';
import {dataService} from './WeatherSubject';


class CitySelector extends Component{
    constructor(props){
        super(props);
        this.state = {
            country: undefined,
            state: "",
            citOb: undefined
        };
        this.handleContryChange = this.handleContryChange.bind(this);
        this.handleStateChange = this.handleStateChange.bind(this);
        this.handleCityChange = this.handleCityChange.bind(this);
    }

    handleCityChange(event) {
        var cityValue = JSON.parse(event.target.value);
        dataService.setData(cityValue);
        this.setState({cityOb: cityValue});             
      }

    handleContryChange(event){
        var country = event.target.value;
        if(country !== "US"){
            this.setState({state: ""});
        }
        this.setState({country: event.target.value});
    }

    handleStateChange(event){
        this.setState({state: event.target.value});
    }

    shouldHideStates()
    {
        return this.state.country === "US";
    }

    writeCityOptions(){
        var options = [];
        options.push(<option key='None' disabled selected>Select a city</option>);
        cityList
        .filter((f) => f.country === this.state.country)
        .filter((f) => f.state === this.state.state)
        .sort((a,b) => a.name.localeCompare(b.name))
        .map((e) => options.push(<option key={e.id} value={JSON.stringify(e)}>{e.name}</option>));
        return options;
    }

    writeStateOptions(){
        var options = [];
        options.push(<option key='None' disabled selected>Select a state</option>);
        var newSet = new Set(cityList.map(c => c.state));
        Array.from(newSet)
        .filter((f) => f !== "")
        .sort((a,b) => a.localeCompare(b))
        .map(c => options.push(<option key={c} value={c}>{c}</option>));        
        return options;
    }

    writeCountryOptions(){
        var options = [];
        options.push(<option key='None' disabled selected>Select a country</option>);
        var newSet = new Set(cityList.map(c => c.country));
        Array.from(newSet)
        .filter((f) => f !== "")
        .sort((a,b) => a.localeCompare(b))
        .map(c => options.push(<option key={c} value={c}>{c}</option>));        
        return options;
    }

    render(){
        return(
            <div className='sidebar'>
                <div>
                    <select id='contry' onChange={this.handleContryChange}>
                        {this.writeCountryOptions()}
                    </select>
                </div>
                <div>
                    {this.shouldHideStates() && <select id='state' onChange={this.handleStateChange}>
                        {this.writeStateOptions()}
                    </select>}
                </div>
                <div>
                    <select id='city' onChange={this.handleCityChange}>
                        {this.writeCityOptions()}
                    </select>
                </div>
            </div>
        );
    }
}

export default CitySelector;