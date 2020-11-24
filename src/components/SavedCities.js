import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from "react-redux";
import {setCurrentCity} from "../redux/actions/citiesActions";
import { makeStyles } from '@material-ui/core/styles';
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

export default function SavedCities  (props) {
    const classes = useStyles();
    const cities = useSelector(store => store.cities.savedCities);
    const dispatch = useDispatch();


    // const svCities = cities.map( (city, index) => {
    //     return (
    //         <Grid item key={index+100}>
    //             <Button className={classes.button}
    //                     onclick={ console.log('city',city[0])}
    //             >{city[0]}</Button>
    //         </Grid>
    //     )
    // })

    return (
        <Button className={classes.button}
                onClick={() => console.log('city',props)}
        >{props[0]}</Button>
    );
};

