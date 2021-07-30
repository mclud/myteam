import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button } from '@material-ui/core';
import axios from 'axios';
import { useDispatch } from "react-redux";
import { valid, invalid, origin } from '../AlertMsg/AlertMsgSlice';
import { logged } from '../AppWraper/AppWraperSlice';
import { useHistory } from "react-router-dom";



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
    const [ password2 , setPassword2 ] = useState({
        error : false,
        errorTxt : "",
        val : ""
    });

    let checkMail = (e) => {
        //sanitize input
        let validMail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        let value = e.target.value.toString();
        if (validMail.test(value)) setMail({error : false, errorTxt : "", val : value}); 
        else setMail({error : true, errorTxt : "Not a valid email", val : value});
    }

    let checkPwd = (e) => {
        let value = e.target.value.toString();
        if (value.length > 6) {
            if (value === "test") setPassword({error : true, errorTxt : "Username should have more than 4 chars", val : value})
            else setPassword({error : false, errorTxt : "", val : value});
        } 
        else setPassword({error : true, errorTxt : "Username should have more than 4 chars", val : value})
    }


    //Sending data to API
    let sendForm = async function() {

        if (!password.error && !mail.error) {
            let dataToSend = {
                "email" : mail.val.trim(),
                "pwd" : password.val,
            };
            let res = await axios({
                method : "POST", 
                url : 'http://localhost:5000/login',
                data : dataToSend,
                withCredentials: true,
            })
    
            if (res.status === 200) {
                if (res.data.error === undefined) {
                    //Reset fields
                    setPassword({val: ""});
                    setMail({val : ""});
    
                    //Dispatch a valid msg && fade it after 2500ms
                    dispatch(valid({msg : res.data.msg}));
                    dispatch(logged());
                    history.push('/');
                    setTimeout(() => dispatch(origin()), 3000);
                } else {
                    let errorMsg = "Problème d'identifiant / mot de passe. Veuillez vérifier vos informations";
                    switch (res.data.error) {
                        case "noUser": 
                            dispatch(invalid({msg: "Problème d'identifiant / mot de passe. Veuillez vérifier vos informations"}));
                            setTimeout(() => dispatch(origin()), 3000);
                            break;
                        case 'wrongPwd':
                            dispatch(invalid({msg: errorMsg}))
                        default:
                            dispatch(invalid({msg: "Default msg"}));
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
            <TextField inputProps={{pattern : "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$"}} className={classes.root} helperText={mail.errorTxt} error={mail.error} id="email" value={mail.val} label="Adresse E-mail" variant="outlined" onChange={e => checkMail(e)}>Adresse e-mail</TextField>
            <TextField className={classes.root} type="password" helperText={password.errorTxt} error={password.error} id="pwd" label="Password" value={password.val} variant="outlined" onChange={e => checkPwd(e)} >Password</TextField>
            <Button className={classes.btn}variant="contained" color="primary" onClick={sendForm}>Se connecter</Button>
        </div>
    )
}