import React from 'react';
import Gmap from "./Gmap";
import Card from "@material-ui/core/Card";
import Moment from 'moment';
import {CardContent, Grid, Typography} from "@material-ui/core";


export function Forecast(props) {


    const oneDayForecast = props.forecastWeather.list[props.forecastPeriod - 1]

    const forecastCards = (props.forecastPeriod === 7) ? props.forecastWeather.list.map((day, index) => {
        return (
            <Grid item key={(index + 1) * 1000}>
                <Card>
                    <CardContent>
                        <Typography align='center'
                                    variant='subtitle2'>{Moment().add(index + 1, 'days').format('ddd, MMM DD')}</Typography>
                        <Typography align='center'
                                    variant='subtitle2'>{Math.floor(day.main.temp - 273.15, 1)} C</Typography>
                        <Typography align='center' variant='caption'>Wind {day.wind.speed} m/s</Typography>
                    </CardContent>
                </Card>
            </Grid>
        )
    }) : (<Grid item>
            <Card>
                <CardContent>
                    <Typography align='center'
                                variant='subtitle2'>{Moment().add(props.forecastPeriod, 'days').format('ddd, MMM DD')}</Typography>
                    <Typography align='center'
                                variant='subtitle2'>{Math.floor(oneDayForecast.main.temp - 273.15, 1)} C</Typography>
                    <Typography align='center' variant='caption'>Wind {oneDayForecast.wind.speed} m/s</Typography>
                </CardContent>
            </Card>
        </Grid>
    );

    return (
        <div>
            <Grid container spacing={2} wrap="wrap" direction="row"
                  justify="space-between"
                  alignItems="flex-start">
                <Grid item>
                    <Grid container spacing={2} justify="space-between"
                          alignItems="flex-start">
                        <Typography>
                            {Moment().add(props.forecastPeriod - 1, 'days').calendar(null,{
                                lastDay : '[Yesterday]',
                                sameDay : '[Today]',
                                nextDay : '[Tomorrow]',
                                lastWeek : '[last] dddd',
                                nextWeek : 'dddd',
                                sameElse : 'L'
                            })}
                        </Typography>
                        {forecastCards}
                    </Grid>
                </Grid>
                <Grid item xs={8}>
                    {(props.forecastPeriod < 7) ? <Gmap {...props.actualLocation}/> : null}
                </Grid>
            </Grid>
        </div>
    );
};