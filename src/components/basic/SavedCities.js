import React from 'react';
import {useHistory} from "react-router-dom";

import {useSelector, useDispatch} from "react-redux";
import {setCurrentCity, deleteCity} from "../../redux/actions/citiesActions";
import {getWeather} from "../../redux/appThunk";

// Material
import {makeStyles} from '@material-ui/core/styles';
import {Button, IconButton} from "@material-ui/core";
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

const useStyles = makeStyles((theme) => ({
    button: {
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

export default function SavedCities() {
    let history = useHistory();
    const classes = useStyles();
    const cities = useSelector(store => store.cities.savedCities);
    const dispatch = useDispatch();

    const handleClick = (city) => {
        dispatch(setCurrentCity(city));
        dispatch(getWeather(city.location));
        history.push(`/${city.city}`)
    }

    const handleDelete = (city) => {
        dispatch(deleteCity(city))
    }


    const svCities = cities.map((city, index) => {
        return (
            <div key={index + 100}>
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
        <div className='Wizard_SavedCities'>
            {svCities}
        </div>
    );
};

