import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button } from '@material-ui/core';
import { useDispatch } from "react-redux";
import { valid, invalid, origin } from "../AlertMsg/AlertMsgSlice";
import { logged } from '../AppWraper/AppWraperSlice';
import axios from "axios";
import './CreateAccount.css';


export default function CreateAccount() {

    const dispatch = useDispatch();

    const [ username, setUsername ] = useState({
        error : false,
        errorTxt : "",
        val : ""
    });

    const [ mail, setMail ] = useState({
        error : false,
        errorTxt : "",
        val : ""
    });

    const [ password, setPassword ] = useState({
        error : false,
        errorTxt : "",
        val : ""
    });

    const useStyles = makeStyles({
        root: {
          background: 'linear-gradient(45deg, white 30%, lightgreen 90%)',
          color: 'white',
          maxWidth: 355,
          margin: '5px auto',
          width: '100%'
        },
        btn : {
            maxWidth: 200,
            margin: '10px auto'
        }
      });

    let checkUsername = (e) => {
        //sanitize input
        let invalidChars = /[<^\\^%>\/!:,. =\[\]\|\`\'\#\"@§µ¨ùµ£\{\}=&\s$]/gi;
        let value = e.target.value.toString().replaceAll(invalidChars, '');
        if (value.length > 3) {
            if (/^admin$/i.test(value)) setUsername({error : true, errorTxt : `Username can't be "${value}"`, val : value})
            else setUsername({error : false, errorTxt : "", val : value});
        } else setUsername({error : true, errorTxt : "Username should have more than 4 chars", val : value})
    }
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
        } else setPassword({error : false, errorTxt : "Username should have more than 4 chars", val : value})
    }

    let sendForm = async function() {

        let dataToSend = {
            "username" : username.val,
            "pwd" : password.val,
            "email": mail.val,
        };
        let res = await axios({
            method : "POST", 
            url : 'http://localhost:5000/join',
            data : dataToSend,
        })

        if (res.status === 200) {
            if (res.data.error === undefined) {
                //Reset fields
                setPassword({val: ""});
                setUsername({val : ""});
                setMail({val : ""});

                //Dispatch a valid msg && fade it after 2500ms
                dispatch(valid({msg : res.data.msg}));
                setTimeout(() => dispatch(origin()), 3000);
            } else {
                switch (res.data.error) {
                    case "userExists": 
                        dispatch(invalid({msg: "Cet email est déjà utilisé."}));
                        setMail({error: true, errorTxt: "Already used", val: mail.val});
                        setTimeout(() => dispatch(origin()), 3000);
                        break;
                    default:
                        dispatch(invalid({msg: "Default msg"}));
                        setTimeout(() => dispatch(origin()), 3000);
                }
            }

            console.log()
        } 
    }

    const classes = useStyles();

    return (
        <div className="form-user">
            <TextField className={classes.root} helperText={username.errorTxt} error={username.error} id="username" value={username.val} label="Username" variant="outlined" onChange={e => checkUsername(e)}>Username</TextField>
            <TextField inputProps={{pattern : "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$"}} className={classes.root} helperText={mail.errorTxt} error={mail.error} id="email" value={mail.val} label="Adresse E-mail" variant="outlined" onChange={e => checkMail(e)}>Adresse e-mail</TextField>
            <TextField className={classes.root} type="password" helperText={password.errorTxt} error={password.error} id="pwd" label="Password" value={password.val} variant="outlined" onChange={e => checkPwd(e)} >Password</TextField>
            <Button className={classes.btn}variant="contained" color="primary" onClick={sendForm}>Join Us</Button>
        </div>
    )
}