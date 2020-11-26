import React from 'react';
import Gmap from "./Gmap";
import Card from "@material-ui/core/Card";
import Moment from 'moment';
import {CardContent, Grid, Typography} from "@material-ui/core";
import {ForecastItems} from "./elementary/ForecastItems";


export function Forecast(props) {
    console.log(props)

    const forecastItems = (props.hasFetched) ? (
        <ForecastItems {...props}/>
    ) : null;


       return (
        <div>
            <Grid container spacing={2} wrap="wrap" direction="row"
                  justify="space-between"
                  alignItems="flex-start">

                <Grid item>
                    {forecastItems}
                </Grid>

                <Grid item xs={8}>
                    {(props.forecastPeriod < 7) ? <Gmap {...props.actualLocation}/> : null}
                </Grid>
            </Grid>
        </div>
    );
}