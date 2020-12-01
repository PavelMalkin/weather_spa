import React from 'react';
import Navbar from "../basic/Navbar";
import Main from "../basic/Main";
import {Forecast} from "../basic/Forecast";

import './Home.css'


export function Home(props) {

    return (
        <div className='Wizard_home'>
            <Navbar/>
            <Main {...props.location}/>
            <Forecast />
        </div>
    );
}