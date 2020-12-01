import React, {useMemo} from 'react';
import './Forecast.css'
import Gmap from "../elementary/Gmap";
import {ForecastCard} from "../elementary/ForecastCard";

import Moment from 'moment';

import {Typography} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import {ForecastLine} from "../elementary/ForecastLine";
import {useSelector} from "react-redux";

export function Forecast(props) {
    const currentWeather = useSelector(store => store.weather )

    const forecastItems = useMemo(() => {
        return (props.hasFetched) ? (
        props.weather.daily.map(day => <ForecastCard key={day.dt} {...day}/>)
    ) : null;
    },[props.weather.daily, props.hasFetched])

    const forecastHours = props.weather.hourly.map(forecast => {
            return (Moment.unix(forecast.dt).format('DD') === Moment().add(props.forecastPeriod - 1, 'days').format('DD') &&
                Moment.unix(forecast.dt).format('HH') % 6 === 0)?
                <ForecastLine key={forecast.dt} {...forecast}/> : null
        });

    const gMap = useMemo(()=>{
        return props.forecastPeriod < 7 ?<Gmap {...props.actualLocation}/> : null
    },[props.forecastPeriod, props.actualLocation, currentWeather])

    const typeForecast = (props.hasFetched && props.forecastPeriod < 7) ? (
        <div className='Wizard_Forecast_hourly'>
            <div className='Wizard_DetailedWeather_hourlyForecast_item'>
                <Typography variant='h5'>
                    {Moment().add(props.forecastPeriod - 1, 'days').calendar(null, {
                        sameDay: '[Today]',
                        nextDay: '[Tomorrow]',
                        nextWeek: 'dddd',
                        sameElse: 'L'
                    })}
                </Typography>
            </div>
            <div className='Wizard_DetailedWeather_hourlyForecast_item'>
                <Typography>
                    {Moment().add(props.forecastPeriod - 1, 'days').format('MMMM, DD')}
                </Typography>
            </div>
            <div className='Wizard_DetailedWeather_hourlyForecast_item'>
                <Typography>Time</Typography>
                <Typography>Weather</Typography>
            </div>
            <div className='delimiter'>
                <hr className="solid"/>
            </div>
            {forecastHours}
        </div>
    ) : (
        <div>
            <div className='Wizard_DetailedWeather_week'>
                {forecastItems}
            </div>
        </div>
    );

    return (
        <Paper elevation={3}>
            <div className='Wizard_Forecast_Container'>
                {typeForecast}
                {gMap}
            </div>
        </Paper>
    );
}