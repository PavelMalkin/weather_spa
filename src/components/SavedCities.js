import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import {Button} from "@material-ui/core";

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
    const cities = useSelector(store => store.cities.savedCities)

    const svCities = cities.map( (city, index) => {
        return (
            <Grid item xs={2} key={index+100}>
                <Button className={classes.button}>{city[0]}</Button>
            </Grid>
        )
    })

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                {svCities}
            </Grid>
        </div>
    );
};

