import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import Autocomplete from './Autocomplete';
import {getCurrentWeather} from "../../../travel_factory/src/redux/appThunk";
import {setForecast} from "../redux/actions/weatherActions";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import {fade, makeStyles} from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import Button from "@material-ui/core/Button";
import TextField from '@material-ui/core/TextField';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    title: {
        flexGrow: 1,
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

export default function SearchAppBar(props) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [City, setCity] = useState('')


    const handleButtonClick = (cnt) => {
        dispatch(setForecast(cnt))
    }

    const handleChange = (e) => {
        setCity(e.target.value)
    }

    return (
        <div className={classes.root}>
            <AppBar position="static"
                    color="inherit"
            >
                <Toolbar>
                    <div className={classes.menuButton}
                         edge="start"
                    >
                        <Button color="inherit" onClick={() => handleButtonClick(1)}>Today</Button>
                        <Button color="inherit"  onClick={() => handleButtonClick(2)}>Tomorrow</Button>
                        <Button color="inherit"  onClick={() => handleButtonClick(7)}>Week</Button>
                    </div>
                    <Typography className={classes.title} variant="h6" noWrap>

                    </Typography>

                    <div className={classes.search}>
                        <Autocomplete/>
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    );
}
