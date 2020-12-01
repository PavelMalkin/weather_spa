import React, {useEffect, useMemo} from 'react';
import {useSelector, useDispatch} from "react-redux";
import {saveCity} from "../../redux/actions/citiesActions";
// Material
import Paper from '@material-ui/core/Paper';
import {CardContent, Grid, IconButton, Typography} from "@material-ui/core";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import {ActualWeather} from "../elementary/ActualWeather";


export default function Main(props) {
    const dispatch = useDispatch();
    const weather = useSelector(store => store.weather);
    const weatherToTest = useSelector(store => store.weather.weather);
    const savedCities = useSelector(store => store.cities.savedCities)
    const location = useSelector(store => store.location);

    useEffect(()=> console.log('location in Main', location),[location])
    // useEffect(()=> console.log('weatherToTest in Main', weatherToTest),[weatherToTest])

    const Weather = useMemo(()=> {
        return weather.hasFetched ? <ActualWeather weather={weather.weather.current} location={props.actualLocation}/> : null;
    }, [weather.hasFetched, weather.weather, location])



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

