import React, {useEffect, useMemo} from 'react';
import Navbar from "../basic/Navbar";
import Main from "../basic/Main";
import {Forecast} from "../basic/Forecast";
import {useSelector} from "react-redux";


export function Home(props) {
    const location = useSelector(store => store.location);

    useEffect(()=> console.log('props.location in Home', location),[location])
    return (
        <div className='Wizard_home'>
            <Navbar {...props.location}/>
            {useMemo(()=> <Main {...props.location}/>, [props.location])}
            <Forecast {...props.weather} />
        </div>
    );
}