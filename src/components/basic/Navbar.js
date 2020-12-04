import React from 'react';
import {useDispatch} from "react-redux";

import {setForecast} from "../../redux/actions/weatherActions";
import Autocomplete from '../elementary/Autocomplete';

import './Navbar.css'

// Material
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";


export default function Navbar() {
    const dispatch = useDispatch();

    const handleButtonClick = (cnt) => {
        dispatch(setForecast(cnt))
    }

    return (
        <div >
            <Card position="static" color="inherit" className='Navbar_Container'>
                    <div className='Navbar_Buttons_Container'>
                        <Button color="inherit" onClick={() => handleButtonClick(1)}>Today</Button>
                        <Button color="inherit" onClick={() => handleButtonClick(2)}>Tomorrow</Button>
                        <Button color="inherit" onClick={() => handleButtonClick(7)}>Week</Button>
                    </div>
                    <Autocomplete/>

            </Card>
        </div>
    );
}
