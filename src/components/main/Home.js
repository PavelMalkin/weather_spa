import React from 'react';
import Navbar from "../basic/Navbar";
import Main from "../basic/Main";
import {Forecast} from "../basic/Forecast";


export function Home(props) {

    return (
        <div className='Wizard_home'>
            <Navbar {...props.location}/>
            <Main {...props.location}/>
            <Forecast {...props.weather} />
        </div>
    );
}