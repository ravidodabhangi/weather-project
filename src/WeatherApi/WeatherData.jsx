import axios from "axios";
import React, { useEffect, useState } from "react";
import { WiSunrise, WiSunset, WiHumidity,WiDayThunderstorm, WiSmoke,WiDayRain, WiDayHaze,WiStrongWind,WiDaySunny, WiDayFog,WiDayCloudy,WiDust} from "react-icons/wi";
import { BiCloudDrizzle } from "react-icons/bi";
function WeatherData() {
  let [cityData, setCityData] = useState([]);
  let [cName, setCName] = useState("Bangalore");
  let [city, setCity] = useState(cName);
  let[wd,setwd]=useState("");
  let [icon,setIcon]=useState(null)
  let[text,setText]=useState("");
  let[months,setMonths]=useState("");
  let[month,setMonth]=useState("");
  let[days,setDays]=useState("");
  let[day,setDay]=useState("");
  useEffect(() => {
    async function getData() {
      let res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=f51d58efa95513220943b03734f9de51`
      );
      let weathermood = res.data.weather[0];
      let cityName = res.data;
      let countryName = res.data.sys;
      let weatherDetail = res.data.main;
      let Wind = res.data.wind;
      let sunr = res.data.sys.sunrise;
      let date1 = new Date(sunr * 1000);
      let sunrise = `${date1.getHours()}:${date1.getMinutes()}`;
      let suns = res.data.sys.sunset;
      let date2 = new Date(suns * 1000);
      let sunset = `${date2.getHours()}:${date2.getMinutes()}`;
      let weatherData = {
        weathermood,cityName,countryName,weatherDetail,Wind,sunrise,sunset
      };
      let sday=new Date().getDay();
      setDays(sday);
      switch (days) {
          case 0:setDay("Sunday")
            break;
            case 1:setDay("Monday")
          break;
          case 2:setDay("Tuesday")
          break;
          case 3:setDay("Wednesday")
          break;
          case 4:setDay("May")
          break;
          case 5:setDay("Thursday")
          break;
          case 6:setDay("Friday")
          break;
          case 7:setMonth("Saturday")
          break;
        default:
          break;
      }
      let smonth=new Date().getMonth();
      setMonths(smonth);
      switch (months) {
          case 0:setMonth("January")
            break;
            case 1:setMonth("February")
          break;
          case 2:setMonth("March")
          break;
          case 3:setMonth("April")
          break;
          case 4:setMonth("May")
          break;
          case 5:setMonth("June")
          break;
          case 6:setMonth("July")
          break;
          case 7:setMonth("August")
          break;
          case 8:setMonth("September")
          break;
          case 9:setMonth("October")
          break; 
          case 10:setMonth("November")
          break;
          case 11:setMonth("December")
          break; 
        default:
          break;
      }
      let wmood=weathermood.main;
      setCityData((preValue) => [weatherData]);
      setwd(wmood);
        switch (wd) {
          case "Clouds":setIcon(<WiDayCloudy/>)
            break;
            case "Dust":setIcon(<WiDust/>)
            break; 
            case "Clear":setIcon(<WiDaySunny/>)
            break; 
            case "Rain":setIcon(<WiDayRain/>)
            break;  
            case "Haze":setIcon(<WiDayHaze/>)
            break; 
            case "Smoke":setIcon(<WiDayFog/>)
            break;
            case "Thunderstorm":setIcon(<WiDayThunderstorm/>)
            break;
            case "Drizzle":setIcon(<BiCloudDrizzle/>)
            break;
          default:setIcon(<WiDaySunny/>)
            break;  
        }
    }
    getData();
    setIcon(<WiDayFog />)
    setCName("");
  }, [city,wd,months,days]);
  let updateCity = () => {
    setCity(cName);
    if(!cName){
      setTimeout(()=>{
        setText("Enter City Name Before Search....")
      },500)
      setTimeout(()=>{
        setText("")
      },2500)
    }
  };
  return (
    <div className="main-boss">
      <div className="form">
        <input
          type="text"
          value={cName}
          onChange={(event) => setCName(event.target.value)}
          placeholder="Enter City Name"
        />
        <button onClick={updateCity}>Search</button><br />
        <h3 style={{marginTop:"10px",color:"white"}}>{text}</h3>
      </div>
      <div>
        {cityData.map((city, index) => {
          let {
            weathermood,
            cityName,
            countryName,
            weatherDetail,
            Wind,
            sunrise,
            sunset,  
          } = city;
          return (
            <div key={index} className="main-body">
              <div className="m-b">
                <div className="main-top">
                  <div className="main-body-top">
                    <h1>
                      {cityName.name}&nbsp;({countryName.country})
                    </h1>
                    <h3>{day},&nbsp;{month}&nbsp;{new Date().getDate()},{new Date().getFullYear()}</h3>
                    <h2>{new Date().getHours()}:{new Date().getMinutes()}:{new Date().getSeconds()}</h2>
                  </div>
                  <div className="head">
                    <div className="main-body-top-icon">
                      <h1>
                      {icon}
                      </h1>
                    </div>
                  </div>
                </div>
                <div className="main-body-middle">
                  <div className="middle1">
                    <h1>{weatherDetail.temp}&nbsp;&deg;C</h1>
                    <div className="middle11">
                      <h2>{weathermood.main}</h2>
                      <h4>({weathermood.description})</h4>
                    </div>
                  </div>
                  <div className="middle2">
                    <h2>Max Temp:&nbsp;{weatherDetail.temp_max}&deg;C</h2>
                    <h2>Min Temp:&nbsp;{weatherDetail.temp_min}&deg;C</h2>
                  </div>
                </div>
                <div className="main-body-down">
                  <div className="down">
                    <h2>
                      <WiSunrise />
                    </h2>
                    <div className="align">
                      <p className="p">sunrise</p>
                      <p>{sunrise}&nbsp;AM</p>
                    </div>
                  </div>
                  <div className="down">
                    <h2>
                      <WiSunset />
                    </h2>
                    <div className="align">
                      <p className="p">sunset</p>
                      <p>{sunset}&nbsp;PM</p>
                    </div>
                  </div>
                  <div className="down">
                    <h2>
                      <WiHumidity />
                    </h2>
                    <div className="align">
                      <p className="p">Humidity</p>
                      <p>{weatherDetail.humidity}&nbsp;%</p>
                    </div>
                  </div>
                  <div className="down">
                    <h2>
                      <WiSmoke />
                    </h2>
                    <div className="align">
                      <p className="p">Pressure</p>
                      <p>{weatherDetail.pressure}&nbsp;mb</p>
                    </div>
                  </div>
                  <div className="down">
                    <h2>
                      <WiStrongWind />
                    </h2>
                    <div className="align">
                      <p className="p">Wind</p>
                      <p>{Wind.speed}&nbsp;km/h</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default WeatherData;
