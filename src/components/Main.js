import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from "react-redux";
import {getCurrentWeather} from '../redux/appThunk'
import {makeStyles} from '@material-ui/core/styles';
import Container from "@material-ui/core/Container";
import Paper from '@material-ui/core/Paper';
import CssBaseline from '@material-ui/core/CssBaseline';
import Card from '@material-ui/core/Card';
import {CardContent, Grid, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(1),
            width: theme.spacing(16),
            height: theme.spacing(16),
        },
    },
}));

export default function Main() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const weather = useSelector(store => store.currentWeather);

    const Weather = (weather.hasFetched) ? (<Card>
        <CardContent>
            <Typography align='center' variant='h5'>{Math.floor(weather.currentWeather.main.temp - 273.15, 1)} C</Typography>
            <Typography align='center' variant='h4'>{weather.currentWeather.name}, {weather.currentWeather.sys.country}</Typography>
            <Typography align='center' variant='h6'>Wind {weather.currentWeather.wind.speed} meters per second</Typography>
        </CardContent>
        </Card>)
        : null;


    return (
        // <Container fixed>
            <Paper elevation={3}>
                <Grid container
                    justify="center"
                    alignItems="center">
                    {Weather}
                </Grid>
                {/*<div style={{backgroundColor: '#cfe8fc',*/}
                {/*    // height: '15vh'*/}
                {/*}}>*/}

                {/*</div>*/}
            </Paper>
        // </Container>
    );

}

