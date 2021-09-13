import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import axios from 'axios';
import L from 'leaflet';
import "./Map.css"
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import store from '../../app/store';
import { Button, TextField } from '@material-ui/core';
import { useState } from 'react';
import { useDispatch } from "react-redux";
import { valid, invalid, origin } from '../AlertMsg/AlertMsgSlice';
import { API_URL } from '../AppWraper/AppWraper';
import { useEffect } from 'react';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;


const MapG = () => {
    const mediaQueryList = window.matchMedia("only screen and (max-width: 600px)");
    const dispatch = useDispatch();
    
    const [ready, setReady] = useState(false)
    const [coordX, setCoordX] = useState({val : ""});
    const [coordY, setCoordY] = useState({val : ""});
    const [fields, setFields] = useState([]);
    const [fieldName, setFieldName] = useState({val : ""});


    //Sending data to API
    let addField = async function() {

        if (!coordX.error && !coordY.error) {

            let address = await axios.get(`https://api-adresse.data.gouv.fr/reverse/?lon=${coordX.val}&lat=${coordY.val}`).then(res => {
                console.log('res is :', res);
                return res;
            });
            
            if (address.status === 200) {
                console.log('adress is :', address.data.features[0].properties.name);
                let dataToSend = {
                    "coordx" : coordX.val,
                    "coordy" : coordY.val,
                    "name" : fieldName.val,
                    "adr" : address.data.features[0].properties.label,
                };
                console.log('data should  be :', dataToSend)
                let res = await axios({
                    method : "POST", 
                    url : API_URL + '/addfield',
                    data : dataToSend,
                    headers : {
                        'Content-Type' : 'application/json'
                    }
                })
        
                if (res.status === 2000) {
                    if (res.data.error === undefined) {
                        //Reset fields
                        setCoordX({val: ""});
                        setCoordY({val : ""});
        
                        //Dispatch a valid msg && fade it after 2500ms
                        dispatch(valid({msg : res.data.msg}));
    
    
                        // history.replace('/');
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
    }

    let handleCoordX = (value) => {
        console.log(value);
        if (value !== undefined && coordX.val !== value) {
            setCoordX({val : value});
        }
    }

    let handleCoordY = (value) => {
        if (value !== undefined && coordY.val !== value) {
            setCoordY({val : value});
        } 
    }

    let handleFieldName = (value) => {
        if (value !== undefined && fieldName.val !== value) {
            setFieldName({val : value});
        } 
    }

    const getPos = () => {
        navigator.geolocation.getCurrentPosition((position) => {
            console.log(position);
            setCoordY({val : position.coords.latitude});
            setCoordX({val : position.coords.longitude});
          });
    }

    useEffect(() => {
        if (fields.length === 0) {
            axios.get(API_URL + '/getfields').then(res=> {
                setFields(res.data);
            });
        } 
    }, []);

    useEffect(() => { setReady(true) }, []);

    return(
        <div className="gen-fields">
            {(store.getState().appwrap.logged && store.getState().appwrap.user.status === "admin") ? 
            <div className="add-field">
                {(navigator.geolocation && mediaQueryList.matches) ? 
                <div>
                    <Button variant="contained" color="primary" onClick={() => getPos()}>Get current position</Button>
                </div>
                :
                null
                }
                <TextField className="field-name" placeholder="Enter field name" value={fieldName.val} onChange={e => handleFieldName(e.target.value)}></TextField>
                <TextField className="coords-x" placeholder="Lon" value={coordX.val} onChange={e => handleCoordX(e.target.value)}></TextField>
                <TextField className="coords-y" placeholder="Lat" value={coordY.val} onChange={e => handleCoordY(e.target.value)}></TextField>
                <Button variant="contained" color="primary" onClick={() => addField()}>Ajouter</Button>
            </div>
            :
            null
            }
            <div className="fields">
                {ready ? 
                    <Map center={[48.552019, 2.409512]} zoom={12} scrollWheelZoom={false}>
                        <TileLayer
                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"                        />

                        {fields.map((field, i) => (
                            <Marker key={i} position={[field.fieldCoordY, field.fieldCoordX]}>
                                <Popup>
                                    Name : {field.fieldName} <br/>
                                    Sports : {field.sportsAvailable} <br />
                                    Adress : {field.fieldAdr}
                                </Popup>
                            </Marker>   
                        ))}          
                    </Map>
                :
                null
                }
            </div>
        </div>

        )
}
export default MapG

