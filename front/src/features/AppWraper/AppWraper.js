import React from "react";
import Header from "../Header/Header";
import AlertMsg from "../AlertMsg/AlertMsg";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import News from "../News/News";
import CreateAccount from "../CreateAccount/CreateAccount";
import { selectAppWrap } from "./AppWraperSlice";
import Login from '../Login/Login'
import { Grid, Item, Box, Hidden } from "@material-ui/core";

export default function AppWraper() {

    const appWrap = useSelector(selectAppWrap);
    
    return (
        <Router>
        <div className="appWrap">
            <Header></Header>
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
        </Router>
    )
}