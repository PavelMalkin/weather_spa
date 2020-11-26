import React from 'react';
import {CardContent, Grid, Typography} from "@material-ui/core";
import Moment from "moment";
import Card from "@material-ui/core/Card";



export function ForecastItems(props) {
    console.log('props in items', props)

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

                <Grid container spacing={2} justify="space-between"
                      alignItems="flex-start">
                    <Typography>
                        {Moment().add(props.forecastPeriod - 1, 'days').calendar(null,{
                            sameDay : '[Today]',
                            nextDay : '[Tomorrow]',
                            nextWeek : 'dddd',
                            sameElse : 'L'
                        })}
                    </Typography>
                    {forecastCards}
                </Grid>

    );
};