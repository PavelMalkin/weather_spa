import React, {useMemo, useCallback} from 'react';
import {useSelector, useDispatch} from "react-redux";
import {saveCity} from "../../redux/actions/citiesActions";

import './Main.css'

// Material
import Paper from '@material-ui/core/Paper';
import {IconButton} from "@material-ui/core";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import {ActualWeather} from "../elementary/ActualWeather";


export default function Main(props) {
    const dispatch = useDispatch();
    const weather = useSelector(store => store.weather);
    const savedCities = useSelector(store => store.cities.savedCities)

    const Weather = useMemo(() => {
        return weather.hasFetched ?
            <ActualWeather weather={weather.weather.current} location={props.actualLocation}/> : null;
    }, [weather.hasFetched, weather.weather, props.actualLocation])


    const handleButton = useCallback(() => {
        dispatch(saveCity([props.actualLocation]))
        }, [dispatch, props.actualLocation] );

    
    return (
        <Paper elevation={3} style={{minHeight: '15vh'}}>
            <div className='MainWeather_Container'>
                <div> </div>
                {Weather}
                <div>
                    <IconButton onClick={handleButton}>
                        {(!savedCities.some(city => city.city === props.actualLocation.city))?
                            <AddCircleOutlineIcon/> : null}
                    </IconButton>
                </div>
            </div>
        </Paper>
    );

}

