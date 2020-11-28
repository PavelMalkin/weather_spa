import React, {useEffect, useState} from 'react';
import Gmap from "./Gmap";
import Moment from 'moment';
import {CardContent, Grid, Typography} from "@material-ui/core";
import {makeStyles} from '@material-ui/core/styles';
import {ForecastCard} from "./elementary/ForecastCard";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
}));

export function Forecast(props) {
    const classes = useStyles();

    const forecastItems = (props.hasFetched) ? (
        props.weather.daily.map((day, index) => <ForecastCard key={index + 10000} {...day}/>)
    ) : null;


    let forecastHours = (props.hasFetched && props.forecastPeriod < 7) ? (
        props.weather.hourly.map(forecast => {
            if (Moment.unix(forecast.dt).format('DD') === Moment().add(props.forecastPeriod - 1, 'days').format('DD') &&
                Moment.unix(forecast.dt).format('HH') % 6 === 0) {
                return (
                    <Grid item key={forecast.dt}>
                        <Typography>
                            {Moment.unix(forecast.dt).format('HH:mm ')}
                            {Math.floor(forecast.temp - 273.15, 1)}°C
                            Wind {forecast.wind_speed} meters per second
                        </Typography>
                    </Grid>
                )
            }
        })
    ) : null;

    const typeForecast = (props.hasFetched && props.forecastPeriod < 7) ? (
        <Grid item>
            <Grid item>
                <Typography>
                    {Moment().add(props.forecastPeriod - 1, 'days').calendar(null, {
                        sameDay: '[Today]',
                        nextDay: '[Tomorrow]',
                        nextWeek: 'dddd',
                        sameElse: 'L'
                    })}
                </Typography>
            </Grid>
            <Grid item>
                <Typography>
                    {Moment().add(props.forecastPeriod - 1, 'days').format('MMMM, DD')}
                </Typography>
            </Grid>
            <Grid item>
                <Typography>
                    Time Weather
                </Typography>
            </Grid>
            <div className='delimiter'>
                <hr className="solid"/>
            </div>
            {forecastHours}
        </Grid>
    ) : (
        <Grid item>
            <Grid container spacing={2} justify="flex-start">
                {(props.forecastPeriod < 7) ? null : forecastItems}
            </Grid>
        </Grid>
    );

    return (
        <Grid container spacing={2}
              justify="space-between"
        >
            {typeForecast}

            {(props.forecastPeriod < 7) ?
                <Grid item xs={8}>
                    <Gmap {...props.actualLocation}/>
                </Grid>
                : null}
        </Grid>
    );
}