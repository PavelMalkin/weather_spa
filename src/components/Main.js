import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from "react-redux";
import {getCurrentWeather} from '../../../travel_factory/src/redux/appThunk'
import {saveCity} from "../redux/actions/citiesActions";
import {makeStyles} from '@material-ui/core/styles';
import Container from "@material-ui/core/Container";
import Paper from '@material-ui/core/Paper';
import CssBaseline from '@material-ui/core/CssBaseline';
import Card from '@material-ui/core/Card';
import {CardContent, Grid, IconButton, Typography} from "@material-ui/core";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

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

export default function Main(props) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const weather = useSelector(store => store.currentWeather);
    const savedCities = useSelector(store => store.cities.savedCities)

    const Weather = (weather.hasFetched) ? (<Grid item>
            <CardContent>
                <Typography align='center'
                            variant='h5'>{Math.floor(weather.currentWeather.main.temp - 273.15, 1)} C</Typography>
                <Typography align='center'
                            variant='h4'>{weather.currentWeather.name}, {weather.currentWeather.sys.country}</Typography>
                <Typography align='center' variant='h6'>Wind {weather.currentWeather.wind.speed} meters per
                    second</Typography>
            </CardContent>
        </Grid>)
        : null;

    const handleButton = () => {
        if (!savedCities.find(city => city[0] === props.actualLocation[0])) {
        dispatch(saveCity(props.actualLocation))
        }
    }


    return (
        <Paper elevation={3} style={{minHeight: '15vh'}}>
            <Grid container
                  direction="row"
                  justify="space-between"
                  alignItems="flex-start">
                <Grid item></Grid>
                {Weather}
                <Grid item>
                    <Grid container>
                        <Grid item>
                            <IconButton onClick={handleButton}>
                                <AddCircleOutlineIcon/>
                            </IconButton>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    );

}

