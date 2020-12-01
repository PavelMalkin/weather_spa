import React, {useEffect, useMemo} from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import {Home} from './components/main/Home'

import {useSelector, useDispatch} from "react-redux";
import {getCurrentWeatherByCoord, getWeather} from './redux/appThunk'
import SavedCities from "./components/basic/SavedCities";
import {makeStyles} from '@material-ui/core/styles';
import {Grid} from "@material-ui/core";
import {saveCity} from "./redux/actions/citiesActions";
import {DetailedWeather} from "./components/main/DetailedWeather";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));


function App() {
    const classes = useStyles();
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
    }, [location]);

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

    const home = useMemo(()=> <Home location={location} weather={weather}/> ,[location])

    const routes = (
        <div>
            <Switch>
                <Route exact path="/" component={() => <Home location={location} weather={weather}/>}/>
                {savedCities.savedCities.map(city => {
                  return ( <Route key={city.location.lat} path={`/${city.city}`} component={() => <DetailedWeather location={location} weather={weather}/>}/>)
                })}
            </Switch>
        </div>
    );


    const cities = useMemo(() => <SavedCities {...savedCities}/>, [savedCities])


    return (
        <div className="App">
            <Router>
                <Grid container
                      className={classes.root}
                      direction='column'
                >
                    {routes}

                    <Grid item>
                        {cities}
                    </Grid>

                </Grid>
            </Router>
        </div>
    );
}

export default App;
