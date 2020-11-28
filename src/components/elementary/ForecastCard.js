import React from 'react';
import {CardContent, Grid, Typography} from "@material-ui/core";
import Moment from "moment";
import Card from "@material-ui/core/Card";


export function ForecastCard(props) {
    return (
        <Grid item>
            <Card>
                <CardContent>
                    <Grid container direction="column">
                    <Typography align='center'
                                variant='subtitle2'>
                        {Moment.unix(props.dt).format('ddd, MMM DD HH:mm')}
                    </Typography>
                    <Typography align='center'
                                variant='subtitle2'>
                        {Math.floor(+props.temp.day - 273.15, 1)}/{Math.floor(+props.temp.night - 273.15, 1)} °C
                    </Typography>
                    <Typography align='center' variant='caption'>Wind {props.wind_speed} m/s</Typography>
                    </Grid>
                </CardContent>
            </Card>
        </Grid>
    )
}