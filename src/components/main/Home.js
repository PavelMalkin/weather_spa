import React from 'react';
import {Grid} from "@material-ui/core";
import Navbar from "../Navbar";
import Main from "../Main";
import {Forecast} from "../Forecast";


export function Home(props) {

    return (
        <div className='Wizard_home'>
            <Navbar {...props.location}/>
            <Main {...props.location}/>
            <Forecast {...props.weather} />
        </div>
    );
}