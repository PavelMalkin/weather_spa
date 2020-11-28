import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from "react-redux";
import {setCurrentCity} from "../redux/actions/citiesActions";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {Button} from "@material-ui/core";
import {dropActualWeather, dropForecastWeather ,dropWeather} from "../redux/actions/weatherActions";
import {getWeather} from "../redux/appThunk";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    button: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

export default function SavedCities  () {
    const classes = useStyles();
    const cities = useSelector(store => store.cities.savedCities);
    const dispatch = useDispatch();

    const handleClick = (city) => {
        dispatch(setCurrentCity(city));
        dispatch(getWeather(city.location))

    }


    const svCities = cities.map( (city, index) => {
        return (
            <Grid item key={index+100}>
                <Button className={classes.button}
                        onClick={() => handleClick(city)}
                >{city.city}</Button>
            </Grid>
        )
    })

    return (
            <Grid container  spacing={2}
                  wrap="wrap" direction="row"
                  justify="space-around"
                  alignItems="flex-start">
                {svCities}
            </Grid>
    );
};

