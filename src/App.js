import React, {useEffect, useMemo} from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';


import {Home} from './components/main/Home'
import {DetailedWeather} from "./components/main/DetailedWeather";

import {useSelector, useDispatch} from "react-redux";
import {getCurrentWeatherByCoord, getWeather} from './redux/appThunk'
import SavedCities from "./components/basic/SavedCities";
import {saveCity} from "./redux/actions/citiesActions";


function App() {
    const dispatch = useDispatch();
    const weather = useSelector(store => store.weather)
    const savedCities = useSelector(store => store.cities)
    const location = useSelector(store => store.location);

    useEffect(() => {
        if (!location.hasFetched && !location.isFetching) {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        dispatch(getCurrentWeatherByCoord([position.coords.latitude, position.coords.longitude]));
                    },
                    () => {
                        console.log('location error')
                    }
                );
            } else {
                console.log('Browser doesnt support Geolocation')
            }
        }
    }, [dispatch, location]);

    useEffect(() => {
            if (localStorage.getItem('savedCities') && !savedCities.hasFetched) {
                dispatch(saveCity(JSON.parse(localStorage.getItem('savedCities'))))
            } else {
                localStorage.setItem('savedCities', JSON.stringify(savedCities.savedCities))
            }
        },
        [savedCities])

    useEffect(() => {
        if (!weather.hasFetched && !weather.isFetchingError && !weather.isFetching && location.hasFetched) {
            dispatch(getWeather(location.actualLocation.location))
        }
    }, [weather, location]);

    const home = useMemo(() => <Home location={location}/>, [location])

    const routes = (useMemo(() => {
        return (
            <div>
                <Switch>
                    <Route exact path="/" component={() => home}/>
                    {savedCities.savedCities.map(city => {
                        return (<Route key={uuidv4()} path={`/${city.city}`}
                                       component={() => <DetailedWeather location={location}/>}/>)
                    })}
                </Switch>
            </div>
        )
    }, [savedCities.savedCities, home, location]))


    const cities = useMemo(() => <SavedCities {...savedCities}/>, [savedCities])


    return (
        <div className="App">
            <Router>
                {routes}
                {cities}
            </Router>
        </div>
    );
}

export default App;
