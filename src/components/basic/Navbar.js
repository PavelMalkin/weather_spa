import React from 'react';
import {useDispatch} from "react-redux";
import Autocomplete from '../elementary/Autocomplete';
import {setForecast} from "../../redux/actions/weatherActions";

// Material
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {fade, makeStyles} from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";


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

    const handleButtonClick = (cnt) => {
        dispatch(setForecast(cnt))
    }

    return (
        <div className={classes.root}>
            <AppBar position="static"
                    color="inherit"
            >
                <Toolbar>
                    <div className={classes.menuButton}>
                        <Button color="inherit" onClick={() => handleButtonClick(1)}>Today</Button>
                        <Button color="inherit" onClick={() => handleButtonClick(2)}>Tomorrow</Button>
                        <Button color="inherit" onClick={() => handleButtonClick(7)}>Week</Button>
                    </div>
                    <Typography className={classes.title} variant="h6" noWrap> </Typography>
                    <div className={classes.search}>
                        <Autocomplete/>
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    );
}
