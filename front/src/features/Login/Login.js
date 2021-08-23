import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button } from '@material-ui/core';
import axios from 'axios';
import { useDispatch } from "react-redux";
import { valid, invalid, origin } from '../AlertMsg/AlertMsgSlice';
import { logged } from '../AppWraper/AppWraperSlice';
import { useHistory } from "react-router-dom";
import { saniMail, saniPwd } from '../Security/Cookie';



export default function Login() {

    const dispatch = useDispatch();
    const history = useHistory();
    const useStyles = makeStyles({
        root: {
          background: 'linear-gradient(45deg, white 30%, lightgreen 90%)',
          color: 'white',
          maxWidth: 355,
          margin: '5px auto',
          width: '100%'
        },
        parent : {
            marginTop : "15px",
        },
        btn : {
            maxWidth: 200,
            margin: '10px auto'
        }
      });

    const [ mail , setMail ] = useState({
        error : false,
        errorTxt : "",
        val : ""
    });
    const [ password , setPassword ] = useState({
        error : false,
        errorTxt : "",
        val : ""
    });

    //Sending data to API
    let sendForm = async function() {

        if (!password.error && !mail.error) {
            let datas = new URLSearchParams();
            datas.append('email', mail.val.trim());
            datas.append('pwd',password.val);
            let dataToSend = {
                "email" : mail.val.trim(),
                "pwd" : password.val,
            };
            axios.defaults.withCredentials = true;
            let res = await axios({
                method : "POST", 
                url : process.env.REACT_APP_API_URL + '/login',
                data : datas,
                withCredentials:  "true",
                headers : {
                    'Content-Type' : 'application/x-www-form-urlencoded'
                }
            })
    
            if (res.status === 200) {
                if (res.data.error === undefined) {
                    //Reset fields
                    setPassword({val: ""});
                    setMail({val : ""});
    
                    //Dispatch a valid msg && fade it after 2500ms
                    dispatch(valid({msg : res.data.msg}));

                    dispatch(logged({user: res.data.user}));
                    history.replace('/');
                    setTimeout(() => {
                        dispatch(origin());
                    }, 3000);
                } else {
                    let errorMsg = "Problème d'identifiant / mot de passe. Veuillez vérifier vos informations";
                    switch (res.data.error) {
                        case "noUser": 
                            dispatch(invalid({msg: errorMsg}));
                            setTimeout(() => dispatch(origin()), 3000);
                            break;
                        case 'wrongPwd':
                            dispatch(invalid({msg: errorMsg}))
                        default:
                            dispatch(invalid({msg: errorMsg}));
                            setTimeout(() => dispatch(origin()), 3000);
                    }
                }
            } 
        }
    }

    //Using styles
    const classes = useStyles();

    return(
        <div className="form-user">
            <TextField inputProps={{pattern : "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$"}} className={classes.root} helperText={mail.errorTxt} error={mail.error} id="email" value={mail.val} label="Adresse E-mail" variant="outlined" onChange={e => setMail(saniMail(e))}>Adresse e-mail</TextField>
            <TextField className={classes.root} type="password" helperText={password.errorTxt} error={password.error} id="pwd" label="Password" value={password.val} variant="outlined" onChange={e => setPassword(saniPwd(e))} >Password</TextField>
            <Button className={classes.btn}variant="contained" color="primary" onClick={sendForm}>Se connecter</Button>
        </div>
    )
}