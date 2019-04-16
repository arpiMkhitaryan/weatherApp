import React, {Component} from 'react';
import moment from 'moment';
import {Link} from "react-router-dom";
import {formatRoute} from 'react-router-named-routes';
import {routes} from '../config';
import {Icon} from 'antd';
import {convertToCelsius} from './Herlpers';
import '../App.css';

const {HOME_PAGE} = routes;


class HourlyForecast extends Component {
    state = {
        day: null,
        data: null
    };

    componentDidMount() {
        const {day} = this.state;
        const weekday = moment().day(`${this.props.match.params.weekday}`).format();
        this.setState({
            day: weekday,
        })
        const url = `https://api.openweathermap.org/data/2.5/forecast?id=616051&appid=886705b4c1182eb1c69f28eb8c520e20&dt_txt=${day}&appid=886705b4c1182eb1c69f28eb8c520e20`;

        fetch(url).then(res => res.json())
            .then(response => this.setState({
                data: response.list.filter(item => item['dt_txt'].includes(`${this.state.day.substring(0, 10)}`)),
            }))
            .catch(error => console.error('Error:', error));

    }

    render() {
        const {data} = this.state;
        return (

            <React.Fragment>
                <div>
                    <Link to={formatRoute(HOME_PAGE)}><Icon type="left" style={{fontSize: '3em', color: '#e69e1ba8'}}/>
                    </Link>
                    {data ? data.map(o => {

                        return (
                            <div className='container'>

                                <div className='right-section'>
                                    <div>{moment(o['dt_txt']).format('LLL')}</div>
                                    <span><img src={`http://openweathermap.org/img/w/${o.weather[0].icon}.png`}
                                               alt="Weather icon"/></span>
                                </div>
                                <div className='left-section'>
                                    <div>
                                        <span className='max-temp'>{convertToCelsius(o.main.temp_max)} &#8451;</span>
                                        <span className='min-temp'> {convertToCelsius(o.main.temp_min)} &#8451;</span>
                                        <span>{o.weather[0].description}</span>
                                    </div>
                                    <div>{o.wind.speed}m/s</div>
                                    <div>
                                        <span>Clouds: {o.clouds.all}%,</span>
                                        <span>{o.main.pressure}hpa</span>
                                    </div>
                                </div>
                            </div>)
                    }) : <Icon type="loading" style={{
                        fontSize: '3em',
                        color: 'orange',
                        margin: 'auto',
                        width: '100%',
                        height: '100%'
                    }}/>}
                </div>
            </React.Fragment>
        );
    }
}

export default HourlyForecast;
