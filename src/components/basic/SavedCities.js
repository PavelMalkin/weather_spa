import React from 'react';
import {useHistory} from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';

import {useDispatch} from "react-redux";
import {setCurrentCity, deleteCity} from "../../redux/actions/citiesActions";
import {getWeather} from "../../redux/appThunk";

import './SavedCities.css'

// Material
import {makeStyles} from '@material-ui/core/styles';
import {Button, IconButton, Typography} from "@material-ui/core";
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
    button: {
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

export default function SavedCities(props) {
    let history = useHistory();
    const classes = useStyles();
    const dispatch = useDispatch();

    const handleClick = (city) => {
        dispatch(setCurrentCity(city));
        dispatch(getWeather(city.location));
        history.push(`/${city.city}`)
    }

    const handleDelete = (city) => {
        dispatch(deleteCity(city))
    }

    const svCities = props.savedCities.map((city, index) => {
        return (
            <div key={uuidv4()}>
                <Button className={classes.button}
                        onClick={() => handleClick(city)}
                >{city.city}</Button>
                <IconButton size="small" aria-label="delete" onClick={() => handleDelete(city)}>
                    <HighlightOffIcon style={{fontSize: 13}}/>
                </IconButton>
            </div>
        )
    })

    return (
        <Paper elevation={3} className='Wizard_SavedCities_Container'>
            <Typography>Saved cities</Typography>
            <div className='Wizard_SavedCities'>
                {svCities}
            </div>
        </Paper>

    );
};

