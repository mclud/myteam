import React, { useState, useEffect } from "react";
import AlertMsg from "../AlertMsg/AlertMsg";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CreateAccount from "../CreateAccount/CreateAccount";
import Login from '../Login/Login'
import { Grid, Box, Hidden } from "@material-ui/core";
import LinearProgress from '@material-ui/core/LinearProgress';
import { makeStyles } from '@material-ui/core/styles';
import io, { Socket } from "socket.io-client";
import {getCookie} from '../Security/Cookie';
import AppWraperSlice, { logged, selectAppWrap } from "./AppWraperSlice";
import { connect, useDispatch } from "react-redux";
import store from "../../app/store";
import NavBar from "../NavBar/NavBar";
import NavLayer from "../NavLayer/NavLayer";
import { bindActionCreators } from "redux";
import history from "../History/History";
import HomeSlider from "../HomeSlider/HomeSlider";
import LiveChat from "../LiveChat/LiveChat";

export const API_URL = (process.env.NODE_ENV === "production") ? process.env.REACT_APP_API_URL_PROD : process.env.REACT_APP_API_URL_DEV;
export const ioURL = (process.env.NODE_ENV === "production") ? process.env.REACT_APP_IO_URL_PROD : process.env.REACT_APP_IO_URL_DEV;

const socket = io(ioURL, {
    widthCredentials: true,
    extraHeader: {
        "ioteam": 'myTeamIO',
    }
});

const useStyles = makeStyles((theme) => ({
    root: {
      width: '80%',
      height: '100vh',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
      justifyContent : 'center',
      alignItems : 'center',
      margin: "auto",
      display: 'flex!important',
      flexDirection : 'column',
      color: 'white',
    },
    appBg : {
        backgroundColor: '#222629'
    },
    waitMsg: {
        fontFamily: 'Duck',
        fontSize: '2rem',
        letterSpacing : '4px',
    },
    bar: {
        width: '100%',
        height: '35px',
    }
  }));

export function AppWraper() {
    const dispatch = useDispatch();

    const [isAuth, setIsAuth] = useState();
    const [cookieCheck, setCookieCheck] = useState(false);    
    const [customUser, setCustomUser] = useState();
    const [toggleMenu, setToggleMenu] = useState();

    useEffect(() => {
        if (toggleMenu !== store.getState().navlayer.open) setToggleMenu(store.getState().navlayer.open);

        // //Is auth ?
        let cookie = new Promise(async (res, rej) => {
            if (!cookieCheck) {
                setCookieCheck(true);
                let cookie = await getCookie().then(res => res);
                if (cookie.error === undefined) {
                    res(cookie.user);
                } else rej({status: 'fail'});
            }
        }) 
        cookie.then(r => {
            setTimeout(() => {
                setIsAuth(true);
                setCustomUser(r[0]);
                dispatch(logged({user: r[0]}))   
            }, 1000);
        }).catch(er => {
            setTimeout(() => {
                setIsAuth(false) 
            }, 1500);
        }); 
    });

    const classes = useStyles();
    
    return (
        <Router history={history}>
        <div className="appWrap">
        {isAuth === undefined ?
            <div className={classes.appBg}>
                <div className={classes.root}>
                    <LinearProgress className={classes.bar}/>
                    <div className={classes.waitMsg}>BUILDING APP....</div>
                    <LinearProgress className={classes.bar} color="secondary" />
                </div>
            </div>
            : 
            <div>
            <NavBar />
            <NavLayer />
            <AlertMsg></AlertMsg> 
            <HomeSlider />
            <Switch>
                <Route exact path="/">
                <Grid>
                    <Box display="flex" xs={12}>
                    {/* aside left */}
                        <Hidden only={['sm','xs']}>
                            <Grid item md={2}>
                                Left block
                            </Grid>
                        </Hidden>
                        <Grid item xs={12} md={8}>
                            Middle block
                        </Grid>
                        <Hidden only={['sm','xs']}>
                            <Grid item md={2}>
                                Right block
                            </Grid>
                        </Hidden>
                    </Box>
                </Grid>
                </Route>

                <Route path="/fields">
                    <div>
                        Terrains/...
                    </div>
                </Route>
                <Route path="/join" component={CreateAccount} />
                <Route path="/login" component={Login} />
                <Route path="/live">
                    <LiveChat socket={socket}></LiveChat>
                </Route>
            </Switch>
            </div>
        }

        </div>
        </Router>
    )
}

const mapStateToProps = (state) => ({
    appwrap: selectAppWrap(state),
  });
const mapDispatchToProps = (dispatch) => ({
actions: bindActionCreators(AppWraperSlice, dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(AppWraper);
