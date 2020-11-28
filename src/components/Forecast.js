import React, {useEffect, useState} from 'react';
import Gmap from "./Gmap";
import Card from "@material-ui/core/Card";
import Moment from 'moment';
import {CardContent, Grid, Typography} from "@material-ui/core";
import {makeStyles} from '@material-ui/core/styles';
import {ForecastCard} from "./elementary/ForecastCard";
import { Container } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
}));

export function Forecast(props) {
    const classes = useStyles();

    const forecastItems = (props.hasFetched) ? (
        props.weather.daily.map((day, index) => <ForecastCard key={index + 1000} {...day}/>)
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
            {/*<Grid container spacing={2} direction='column' justify="flex-start">*/}
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
            {forecastHours}
            {/*</Grid>*/}
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
            {/*<Grid item>*/}
            {/*        <Grid item>Time Weather</Grid>*/}
            {/*        <Grid item>00:00 6°C Wind 5.75 meters per second</Grid>*/}
            {/*        <Grid item>06:00 5°C Wind 5.32 meters per second</Grid>*/}
            {/*        <Grid item>12:00 4°C Wind 4.68 meters per second</Grid>*/}
            {/*        <Grid item>00:00 6°C Wind 5.75 meters per second</Grid>*/}
            {/*        <Grid item>06:00 5°C Wind 5.32 meters per second</Grid>*/}
            {/*    <Grid item>00:00 6°C Wind 5.75 meters per second</Grid>*/}
            {/*    <Grid item>06:00 5°C Wind 5.32 meters per second</Grid>*/}
            {/*    <Grid item>12:00 4°C Wind 4.68 meters per second</Grid>*/}
            {/*    <Grid item>00:00 6°C Wind 5.75 meters per second</Grid>*/}
            {/*    <Grid item>06:00 5°C Wind 5.32 meters per second</Grid>*/}
            {/*    /!*<Grid container*!/*/}
            {/*    /!*      // direction='column'*!/*/}
            {/*    /!*>*!/*/}
            {/*    /!*    <Grid item>Tomorrow</Grid>*!/*/}
            {/*    /!*    <Grid item>November, 29</Grid>*!/*/}



            {/*    /!*</Grid>*!/*/}
            {/*</Grid>*/}


            {(props.forecastPeriod < 7) ?
                <Grid item xs={8}>
                    <Gmap {...props.actualLocation}/>
                </Grid>
                : null}
        </Grid>
    );
}