import './App.css';
import React, {useEffect, useState} from "react";

function App(){
  const coords =  {Glasgow: "lat=55.860916&lon=-4.251433", Edinburgh: "lat=55.953251&lon=-3.188267",
                  Aberdeen: "lat=57.149651&lon=-2.099075", Cambridge: "lat=52.205276&lon=0.119167",
                  London: "lat=51.509865&lon=-0.118092", Sheffield: "lat=53.383331&lon=-1.466667"};
  const [infoG, setInfoG] = useState();
  const [infoE, setInfoE] = useState();
  const [infoA, setInfoA] = useState();
  const [infoC, setInfoC] = useState();
  const [infoL, setInfoL] = useState();
  const [infoS, setInfoS] = useState();

  function dateDiffInDays(eventDate) {
    const _MS_PER_DAY = 1000 * 60 * 60 * 24;
    const current_date = new Date();
    const event_date = Date.UTC(eventDate.getFullYear(), eventDate.getMonth(), eventDate.getDate());
    return Math.floor((event_date - current_date.getTime()) / _MS_PER_DAY);
  }

  const getEventArray = async () => {
    fetch('/api1/events.json')
    .then(res => res.json())
    .then(data => {
    data.data.filter(physical => physical.is_physical === true && typeof physical.areas !== 'undefined').map((events) => {
      const eventDate = new Date(events.start.rfc2882utc);
      const difference = dateDiffInDays(eventDate);
      if(difference >= 0 && difference < 6){
        
        return fetch('https://api.openweathermap.org/data/2.5/onecall?' + coords[events.areas[0].title] + '&exclude=current,minutely,hourly,alerts&appid=fc364ff05ad3917c70d3a7207fc89d7c') 
            .then(res => res.json())
            .then(resp => {

              if(events.areas[0].title === 'Glasgow'){
               setInfoG(oldInfo => [oldInfo, events.start.displaylocal+' (in '+difference+' day(s)): '+events.summaryDisplay+' . Forecast: '+resp.daily[(difference)].weather[0].description + ' and ' + (resp.daily[(difference)].temp.day - 273.15).toFixed(1) + '°C Link: ('+events.siteurl+"). "])
              } else if (events.areas[0].title === 'Edinburgh'){
                setInfoE(oldInfo => [oldInfo, events.start.displaylocal+' (in '+difference+' day(s)): '+events.summaryDisplay+' . Forecast: '+resp.daily[(difference)].weather[0].description + ' and ' + (resp.daily[(difference)].temp.day - 273.15).toFixed(1) + '°C Link: ('+events.siteurl+"). "])
              } else if (events.areas[0].title === 'Aberdeen'){
                setInfoA(oldInfo => [oldInfo, events.start.displaylocal+' (in '+difference+' day(s)): '+events.summaryDisplay+' . Forecast: '+resp.daily[(difference)].weather[0].description + ' and ' + (resp.daily[(difference)].temp.day - 273.15).toFixed(1) + '°C Link: ('+events.siteurl+"). "])
              } else if (events.areas[0].title === 'Cambridge'){
                setInfoC(oldInfo => [oldInfo, events.start.displaylocal+' (in '+difference+' day(s)): '+events.summaryDisplay+' . Forecast: '+resp.daily[(difference)].weather[0].description + ' and ' + (resp.daily[(difference)].temp.day - 273.15).toFixed(1) + '°C Link: ('+events.siteurl+"). "])
              } else if (events.areas[0].title === 'London'){
                setInfoL(oldInfo => [oldInfo, events.start.displaylocal+' (in '+difference+' day(s)): '+events.summaryDisplay+' . Forecast: '+resp.daily[(difference)].weather[0].description + ' and ' + (resp.daily[(difference)].temp.day - 273.15).toFixed(1) + '°C Link: ('+events.siteurl+"). "])
              } else if (events.areas[0].title === 'Sheffield'){
                setInfoS(oldInfo => [oldInfo, events.start.displaylocal+' (in '+difference+' day(s)): '+events.summaryDisplay+' . Forecast: '+resp.daily[(difference)].weather[0].description + ' and ' + (resp.daily[(difference)].temp.day - 273.15).toFixed(1) + '°C Link: ('+events.siteurl+"). "])
              }
              
            })
      }  ;
      
      }); 
    })
    
    .catch(err => {
      console.error('Request failed', err)
    })
  }

 

  useEffect(() => {
    getEventArray();
  }, []);
  
  return(
    <div class="info">
      <h1>Upcoming events</h1>
      <div>
        <h3><u>Glasgow</u></h3>
        {infoG}
      </div>
      <div>
        <h3><u>Edinburgh</u></h3>
        {infoE}
      </div>
      <div>
        <h3><u>Cambridge</u></h3>
        {infoC}
      </div>
      <div>
        <h3><u>London</u></h3>
        {infoL}
      </div>
      <div>
        <h3><u>Sheffield</u></h3>
        {infoS}
      </div>
      <div>
        <h3><u>Aberdeen</u></h3>
        {infoA}
      </div>
    </div>
    
  )
}

export default App;
