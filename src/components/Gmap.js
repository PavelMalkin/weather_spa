import React, {useEffect, useState} from 'react';
import GoogleMapReact from 'google-map-react';
import RoomIcon from '@material-ui/icons/Room';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from "@material-ui/core/IconButton";
import {useSelector} from "react-redux";



export default function Gmap(props) {
    const currentWeather = useSelector(store => store.currentWeather )
    const [weather, setWeather] = useState({"coord": {lon: 34.99, lat: 32.82}});

    useEffect(() => {
        if (currentWeather.hasFetched) {
            setWeather(currentWeather.currentWeather)
        }
    }, [currentWeather])

    console.log('weahter',weather)


    const weatherDescription = (weather.main)?  (`${Math.floor(weather.main.temp - 273.15)} °C,  ` +
    `Wind ${weather.wind.speed} meters per second`) : null;

    const AnyReactComponent = ({text}) => (
        <div>
            <Tooltip title={weatherDescription} placement="top">
                <IconButton>
                    <RoomIcon color="secondary" fontSize="large" />
                </IconButton>
            </Tooltip>
        </div>);


    return (
        <div style={{height: '50vh', width: '100%'}}>
            <GoogleMapReact
                bootstrapURLKeys={{key: process.env.REACT_APP_GOOGLE_API_KEY}}
                defaultCenter={
                    {
                        lat: weather.coord.lat,
                        lng: weather.coord.lon
                    }}
                defaultZoom={11}
            >

                <AnyReactComponent
                    lat={weather.coord.lat}
                    lng={weather.coord.lon}
                    // text={props[0]}
                />


            </GoogleMapReact>
        </div>
    );
}
