import React, { useState, useEffect } from "react";
import AlertMsg from "../AlertMsg/AlertMsg";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CreateAccount from "../CreateAccount/CreateAccount";
import Login from '../Login/Login'
import { Grid, Box, Hidden } from "@material-ui/core";
import LinearProgress from '@material-ui/core/LinearProgress';
import { makeStyles } from '@material-ui/core/styles';
import io from "socket.io-client";
import {getCookie} from '../Security/Cookie';
import AppWraperSlice, { logged, selectAppWrap } from "./AppWraperSlice";
import { connect, useDispatch } from "react-redux";
import store from "../../app/store";
import NavBar from "../NavBar/NavBar";
import NavLayer from "../NavLayer/NavLayer";
import { bindActionCreators } from "redux";
import history from "../History/History";

const socket = io.connect('localhost:5000');

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
    },
    waitMsg: {

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
    //IO
    const [response, setResponse] = useState("");

    useEffect(() => {
        if (toggleMenu !== store.getState().navlayer.open) setToggleMenu(store.getState().navlayer.open);
        console.log('toggle menu is :', toggleMenu)
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

        //io
        socket.on('FromAPI', (res) => {
            setResponse(res.test)
        })
    });

    const classes = useStyles();
    
    return (
        <Router history={history}>
        <div className="appWrap">
        {isAuth === undefined ?
            <div className={classes.root}>
                <LinearProgress className={classes.bar}/>
                <div className={classes.waitMsg}>BUILDING APP....</div>
                <LinearProgress className={classes.bar} color="secondary" />
            </div>
            : 
            <div>
            <NavBar />
            <NavLayer />
            <AlertMsg></AlertMsg> 
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
                            <p>time is : {response}</p>
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