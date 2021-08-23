import { Box, Button, Grid } from "@material-ui/core"
import React, { useEffect, useState } from "react"
import store from '../../app/store'
import './LiveChat.css';
import SendIcon from '@material-ui/icons/Send';

const LiveChat = (props) => {
    const socket = props.socket;
    //msg user is sending
    const [msg, setMsg] = useState({
        user: "",
        text: "",
    });

    const [msgFromSrv, setMsgFromSrv] = useState({
        user : "",
        text : "",
    })

    //msg lists (chat)
    const [chatMsgs, setChatMsgs] = useState([
            {
                user: 'Admin',
                text: 'Be cool and gentle. Have fun!'
            },
        ]);

    //handling typing message
    const msgHandler = (e) => {
        if (e.target.value !== msg.text) {
            setMsg({
                user : store.getState().appwrap.user.userName,
                text : e.target.value
            });
        }
    }

    const sendMsgHandler = () => {
        if (msg.text.length) {
            setChatMsgs([...chatMsgs, msg]); 
            socket.emit('userAddedMessage', msg);
            setMsg({user:'',text:''});
        }
    }

    useEffect(() => {
        socket.on('refreshList', (msg) => {
            setMsgFromSrv(msg);
        });
    }, []);

    useEffect(() => {
        if (msgFromSrv.text !== "") {
            setChatMsgs([...chatMsgs, msgFromSrv]); 
            setMsgFromSrv({user: '', text: ''});
        }
    })

    return (
        <Grid>
        {store.getState().appwrap.logged ?
            <Box display='flex' className="chat-window" xs={12}>
                <Grid item className="chat-dialog" xs={10}>
                    <Grid item className="chat-msgs" xs={12}>
                    {chatMsgs.map((msg, i) => {
                        return (
                        <Grid item className="chat-msg" key={i}>
                            <Grid item xs={2} className="chat-msg-user">{msg.user}</Grid>
                            <Grid item xs={10} className="chat-msg-text">{msg.text}</Grid>
                        </Grid>
                        )
                    })}
                    </Grid>
                    <Grid item className="chat-sendmsg" xs={12}>
                        <input type="text" className="input-msg" value={msg.text} onChange={(e) => msgHandler(e)}/>
                        <Button onClick={() => sendMsgHandler()}><SendIcon></SendIcon></Button>
                    </Grid>
                </Grid>
                <Grid item className="chats-users" xs={2}>
                    Users
                </Grid>
            </Box>
        : 
            <div className="unauth-chat">
                You need to login to acces the chat.
            </div>
        
        }
        </Grid>
    )
}

export default LiveChat;