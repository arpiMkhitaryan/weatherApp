import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {formatRoute} from 'react-router-named-routes';
import {convertToCelsius} from './Herlpers';
import {routes, parameters} from '../config';
import moment from 'moment'

const {HOURLY_FORECAST} = routes;
const {COUNT_OF_DAYS, CITY_ID, APP_ID} = parameters;

class HomePage extends Component {
    state = {
        weather: null,
    };

    componentDidMount() {
        const url = `https://api.openweathermap.org/data/2.5/forecast/daily?id=${CITY_ID}&cnt=${COUNT_OF_DAYS}&appid=${APP_ID}`;

        fetch(url).then(res => res.json())
            .then(response => this.setState({
                weather: response.list,
            }))
            .catch(error => console.error('Error:', error));
    }

    render() {
        const {weather} = this.state;
        const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        let currentWeekdayIndex = moment().day();
        let generatedWeekdays = [];

        const getValidIndex = (array, index) => {
            return index < array.length ? index : index % array.length;
        };

        while (generatedWeekdays.length < COUNT_OF_DAYS) {
            generatedWeekdays.push(weekdays[getValidIndex(weekdays, currentWeekdayIndex)]);
            currentWeekdayIndex++;
        }

        return (
            weather &&
            <React.Fragment>
                <div className='weather-container'>
                    {weather.map((o, index) => {
                        return (
                            <Link to={formatRoute(HOURLY_FORECAST, {weekday: generatedWeekdays[index],})}>
                                <div className='weather-item'>
                                    <div className='weather-weekday'>{generatedWeekdays[index]}</div>
                                    <div className='weather-icon'><img
                                        src={`http://openweathermap.org/img/w/${o.weather[0].icon}.png`}
                                        alt="Weather icon"/></div>
                                    <div className='weather-main'>{o.weather[0].main}</div>
                                    <p className='weather-max-temp'>{convertToCelsius(o.temp.max)} &#8451;</p>
                                    <p className='weather-min-temp'>{convertToCelsius(o.temp.min)} &#8451;</p>
                                </div>
                            </Link>

                        )
                    })}
                </div>
            </React.Fragment>
        );
    }
}

export default HomePage;
