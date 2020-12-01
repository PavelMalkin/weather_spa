import React from 'react';
import Moment from "moment";

import {CardContent, Grid, Typography} from "@material-ui/core";
import Card from "@material-ui/core/Card";


export function ForecastCard(props) {
    return (
        <div className='ForecastCard'>
            <Card>
                <CardContent>
                    <Grid container direction="column">
                        <Typography align='center'
                                    variant='subtitle2'>
                            {Moment.unix(props.dt).format('ddd, MMM DD')}
                        </Typography>
                        <Typography align='center'
                                    variant='subtitle2'>
                            {Math.floor(+props.temp.day - 273.15, 1)}°C Day/ {Math.floor(+props.temp.night - 273.15, 1)}°C
                            Night
                        </Typography>
                        <Typography align='center' variant='caption'>Wind {props.wind_speed} m/s</Typography>
                        <Typography align='center' variant='caption'>{props.weather[0].description}</Typography>
                    </Grid>
                </CardContent>
            </Card>
        </div>
    )
}