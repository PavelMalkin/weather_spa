import React, {useCallback, useEffect, useState} from 'react';
import {BrowserRouter as Router, Switch, Route, Link, useHistory} from "react-router-dom";
import {Home} from './components/main/Home'

import {useSelector, useDispatch} from "react-redux";
import {getCurrentWeatherByCoord, getWeather} from './redux/appThunk'
import Navbar from './components/Navbar'
import SavedCities from "./components/SavedCities";
import Main from "./components/Main";
import {Forecast} from "./components/Forecast";
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
            // width: theme.spacing(16),
            // height: theme.spacing(16),
        },
    },
}));


function App() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useSelector(store => store.location);
    const weather = useSelector(store => store.weather)
    const savedCities = useSelector(store => store.cities)

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
                // Browser doesn't support Geolocation
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

    const routes = (
        <div>
            <Switch>
                <Route exact path="/" component={() => <Home location={location} weather={weather}/>}/>
                {savedCities.savedCities.map(city => {
                  return ( <Route path={`/${city.city}`} component={() => <DetailedWeather location={location} weather={weather}/>}/>)
                })}
            </Switch>
        </div>
    );


    return (
        <div className="App">
            <Router>
                <Grid container
                      className={classes.root}
                      direction='column'
                >


                    {/*<Grid item>*/}
                    {/*    <Navbar {...location}/>*/}
                    {/*</Grid>*/}

                    {/*<Grid item>*/}
                    {/*    <Main {...location}/>*/}
                    {/*</Grid>*/}

                    {/*<Grid item>*/}
                    {/*    <Forecast {...weather} />*/}
                    {/*</Grid>*/}

                    {/*<Switch>*/}
                    {/*    <Route exact path="/" component={Home}/>*/}
                    {/*    <Route exact path="/about" component={About}/>*/}
                    {/*</Switch>*/}
                    {routes}

                    <Grid item>
                        <SavedCities/>
                    </Grid>

                </Grid>
            </Router>
        </div>
    );
}

export default App;
