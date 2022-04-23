import './App.css';
import React from 'react';
import CitySelector from './components/CitySelector';
import WeatherRow from './components/WeatherRow';

function App() {
  return (
    <div className="App">
      <div>
        <div className='app-headder'>
          <h1>The Weather App</h1>
        </div>
      </div>
      <div>
        <CitySelector/>
        <WeatherRow/>        
      </div>
    </div>
  );
}

export default App;
