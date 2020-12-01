import React, {useEffect, useState} from 'react';
import './Gmap.css'
import {useSelector} from "react-redux";
import GoogleMapReact from 'google-map-react';


import RoomIcon from '@material-ui/icons/Room';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from "@material-ui/core/IconButton";




export default function Gmap(props) {
    const currentWeather = useSelector(store => store.weather )
    const [weather, setWeather] = useState({lon: 34.99, lat: 32.82});

    useEffect(() => {
        if (currentWeather.hasFetched) {
            setWeather(currentWeather.weather)
        }
    }, [currentWeather])


    const weatherDescription = (weather.current)?  (`${Math.floor(weather.current.temp - 273.15)} °C,  ` +
    `Wind ${weather.current.wind_speed} meters per second`) : null;

    const AnyReactComponent = ({text}) => (weatherDescription)? (
        <div>
            <Tooltip title={weatherDescription} placement="top">
                <IconButton>
                    <RoomIcon color="secondary" fontSize="large" />
                </IconButton>
            </Tooltip>
        </div>) : null;


    return (
        <div className='map_container'>
            <GoogleMapReact
                defaultZoom={11}
                center={{ lat: weather.lat,
                    lng: weather.lon}}
            >
                <AnyReactComponent
                    lat={weather.lat}
                    lng={weather.lon}
                />

            </GoogleMapReact>
        </div>
    );
}
