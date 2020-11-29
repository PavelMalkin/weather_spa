import React from 'react';
import {useSelector, useDispatch} from "react-redux";
import {saveCity} from "../../redux/actions/citiesActions";
// Material
import Paper from '@material-ui/core/Paper';
import {CardContent, Grid, IconButton, Typography} from "@material-ui/core";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';


export default function Main(props) {
    const dispatch = useDispatch();
    const weather = useSelector(store => store.weather);
    const savedCities = useSelector(store => store.cities.savedCities)

    const Weather = (weather.hasFetched) ? (<Grid item>
            <CardContent>
                <Typography align='center'
                            variant='h5'>{Math.floor(weather.weather.current.temp - 273.15, 1)} °C</Typography>
                <Typography align='center'
                            variant='h4'>{props.actualLocation.city}, {props.actualLocation.countryCode}</Typography>
                <Typography align='center' variant='h6'>{weather.weather.current.weather[0].description}, Wind {weather.weather.current.wind_speed} meters per
                    second</Typography>
            </CardContent>
        </Grid>)
        : null;

    const handleButton = () => {
        if (!savedCities.find(city => city.city === props.actualLocation.city)) {
        dispatch(saveCity([props.actualLocation]))
        }
    }


    return (
        <Paper elevation={3} style={{minHeight: '15vh'}}>
            <Grid container
                  direction="row"
                  justify="space-between"
                  alignItems="flex-start">
                <Grid item>
                </Grid>
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

